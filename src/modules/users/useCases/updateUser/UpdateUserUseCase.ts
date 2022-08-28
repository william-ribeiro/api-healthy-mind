import { parseName } from './../../../../utils/helpers';
import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '../../../../constants';
import { AppError } from '../../../../errors';
import { IUpdateUser, IUser, IUsersRepository } from '../../../../interfaces';
import { filterDefinedProperties } from '../../../../utils';
import { makePasswordUpdate } from '../../utils';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject(CONTAINER.USERS_REPOSITORY)
    private repository: IUsersRepository,
  ) {}

  async execute(id: string, payload: IUpdateUser): Promise<IUser> {
    const user = await this.repository.getById(id);

    if (!user) throw new AppError('User not found', 404);

    if (payload.name) payload.name = parseName(payload.name);

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
