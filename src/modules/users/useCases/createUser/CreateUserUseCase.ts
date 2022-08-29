import { inject, injectable } from 'tsyringe';

import { CONTAINER } from '../../../../constants';
import { AppError } from '../../../../errors';
import { ICreateUser, IUser, IUsersRepository } from '../../../../interfaces';
import { Validators } from '../../../../shared';
import { parseName, removeSpecialCharactersFromString } from '../../../../utils';
import { generatePasswordHash } from '../../utils';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(CONTAINER.USERS_REPOSITORY)
    private userRepository: IUsersRepository,
  ) {}

  async execute(payload: ICreateUser): Promise<IUser> {
    try {
      await new Validators().user.validate(payload, { abortEarly: false });
    } catch (err) {
      throw new AppError(err.errors[0]);
    }

    const user = await this.userRepository.getByEmail(payload.email);

    if (user) throw new AppError('User already exists', 409);

    const { name, email, password, confirmPassword } = payload;

    if (password !== confirmPassword) throw new AppError('Password mismatch');

    payload.name = parseName(name);
    payload.email = removeSpecialCharactersFromString(email);
    payload.password = await generatePasswordHash(password);

    const response = await this.userRepository.create(payload);

    delete response.password;

    return response;
  }
}
