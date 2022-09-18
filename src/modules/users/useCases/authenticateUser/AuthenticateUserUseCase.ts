import { container, inject, injectable } from 'tsyringe';

import {
  IAuthenticateUser,
  ICredentialsRepository,
  IUsersRepository,
} from '../../../../interfaces';

import { compare } from 'bcryptjs';
import moment from 'moment';
import { CONTAINER, JWT } from '../../../../constants';
import { AppError } from '../../../../errors';
import { generateToken } from '../../../../utils';
import { CreateCredentialsUseCase, UpdateCredentialsUseCase } from '../../../credentials';

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject(CONTAINER.USERS_REPOSITORY)
    private userRepository: IUsersRepository,
    @inject(CONTAINER.CREDENTIALS_REPOSITORY)
    private credentialsRepository: ICredentialsRepository,
  ) {}

  async execute({ email, password }): Promise<IAuthenticateUser> {
    const createCredentialsUseCase = container.resolve(CreateCredentialsUseCase);
    const updateCredentialsUseCase = container.resolve(UpdateCredentialsUseCase);

    const user = await this.userRepository.getByEmail(email.toLowerCase().trim());

    if (!user) throw new AppError('User or password incorrect');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('User or password incorrect');

    const accessToken = generateToken({ id: user.id, type: JWT.TYPE.ACCESS_TOKEN });
    const refreshToken = generateToken({
      id: user.id,
      type: JWT.TYPE.REFRESH_TOKEN,
    });

    const userCredentials = await this.credentialsRepository.getCredentialByOwnerId(user.id);

    if (!userCredentials) {
      const createCredentials = {
        ownerId: user.id,
        accessToken,
        refreshToken,
        expiresIn: moment().add(JWT.EXPIRATION_RT_DAYS, 'days'),
      };

      await createCredentialsUseCase.execute(createCredentials);

      return { id: user.id, name: user.name, email, accessToken, refreshToken };
    }

    if (userCredentials.isValid) await updateCredentialsUseCase.execute(user.id, { accessToken });

    if (!userCredentials.isValid)
      await updateCredentialsUseCase.execute(user.id, {
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
