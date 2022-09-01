import { container, inject, injectable } from 'tsyringe';

import {
  IAuthenticateUser,
  IUserCredentialsRepository,
  IUsersRepository,
} from '../../../../interfaces';

import { CONTAINER, JWT } from '../../../../constants';
import { AppError } from '../../../../errors';
import { compare } from 'bcryptjs';
import { generateToken } from '../../../../utils';
import {
  CreateUserCredentialsUseCase,
  UpdateUserCredentialsUseCase,
} from '../../../userCredentials';
import moment from 'moment';

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject(CONTAINER.USERS_REPOSITORY)
    private userRepository: IUsersRepository,
    @inject(CONTAINER.USER_CREDENTIALS_REPOSITORY)
    private userCredentialsRepository: IUserCredentialsRepository,
  ) {}

  async execute({ email, password }): Promise<IAuthenticateUser> {
    const createUserCredentialsUseCase = container.resolve(CreateUserCredentialsUseCase);
    const updateUserCredentialsUseCase = container.resolve(UpdateUserCredentialsUseCase);

    const user = await this.userRepository.getByEmail(email.toLowerCase().trim());

    if (!user) throw new AppError('User or password incorrect');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('User or password incorrect');

    const accessToken = generateToken({ id: user.id, type: JWT.TYPE.ACCESS_TOKEN });
    const refreshToken = generateToken({
      id: user.id,
      type: JWT.TYPE.REFRESH_TOKEN,
    });

    const userCredentials = await this.userCredentialsRepository.getCredentialByUserId(user.id);

    if (!userCredentials) {
      const createCredentials = {
        userId: user.id,
        accessToken,
        refreshToken,
        expiresIn: moment().add(JWT.EXPIRATION_RT_DAYS, 'days'),
      };

      await createUserCredentialsUseCase.execute(createCredentials);

      return { id: user.id, name: user.name, email, accessToken, refreshToken };
    }

    if (userCredentials.isValid)
      await updateUserCredentialsUseCase.execute(user.id, { accessToken });

    if (!userCredentials.isValid)
      await updateUserCredentialsUseCase.execute(user.id, {
        accessToken,
        refreshToken,
        expiresIn: moment().add(JWT.EXPIRATION_RT_DAYS, 'days'),
        isValid: true,
      });

    return {
      id: user.id,
      name: user.name,
      email,
      accessToken,
      refreshToken: userCredentials.isValid ? userCredentials.refreshToken : refreshToken,
    };
  }
}
