import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '../../../../constants';
import { AppError } from '../../../../errors';
import { IUpdateUser, IUser, IUsersRepository } from '../../../../interfaces';
import {
  filterDefinedProperties,
  parseName,
  removeSpecialCharactersFromString,
} from './../../../../utils/helpers';

import { Validators } from '../../../../shared';
import { makePasswordUpdate } from '../../../../utils';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject(CONTAINER.USERS_REPOSITORY)
    private repository: IUsersRepository,
  ) {}

  async execute(id: string, payload: IUpdateUser): Promise<IUser> {
    if (typeof 'object' && !Object.values(payload).length) throw new AppError('Invalid payload');

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

    const isUpdatePassword = await makePasswordUpdate(payload, user.password);

    const payload_ = isUpdatePassword
      ? { ...filterDefinedProperties(isUpdatePassword) }
      : { ...filterDefinedProperties(payload) };

    return this.repository.update(id, payload_).then((data) => {
      delete data.password;
      return data;
    });
  }
}
