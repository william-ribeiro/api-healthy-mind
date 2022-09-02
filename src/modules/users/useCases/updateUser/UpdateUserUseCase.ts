import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors';
import { CONTAINER } from '../../../../constants';
import {
  parseName,
  removeSpecialCharactersFromString,
  filterDefinedProperties,
} from './../../../../utils/helpers';
import { IUpdateUser, IUser, IUsersRepository } from '../../../../interfaces';
import { makePasswordUpdate } from '../../utils';
import { Validators } from '../../../../shared';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject(CONTAINER.USERS_REPOSITORY)
    private repository: IUsersRepository,
  ) {}

  async execute(id: string, payload: IUpdateUser): Promise<IUser> {
    if (!Object.values(payload).length) throw new AppError('Invalid payload');

    const { name, email } = payload;

    const user = await this.repository.getById(id);

    if (!user) throw new AppError('User not found', 404);

    payload.name = !name ? user.name : parseName(name);

    if (email && email !== user.email) {
      const verifyEmail = await this.repository.getByEmail(email);

      if (verifyEmail) throw new AppError('Email in use', 409);

      try {
        await new Validators().email.validate(removeSpecialCharactersFromString(email), {
          abortEarly: false,
        });
      } catch (err) {
        throw new AppError(err.errors[0]);
      }

      payload.email = removeSpecialCharactersFromString(email);
    }

    const isUpdatePassword = await makePasswordUpdate(payload);

    const payload_ = isUpdatePassword
      ? { ...filterDefinedProperties(isUpdatePassword) }
      : { ...filterDefinedProperties(payload) };

    return this.repository.update(id, payload_).then((data) => {
      delete data.password;
      return data;
    });
  }
}
