import moment from 'moment';

import { getRepository, Repository } from 'typeorm';
import { ICreateUser, IUpdateUser, IUser, IUsersRepository } from '../../../interfaces';
import { User } from '../entities';

export class UsersRepository implements IUsersRepository {
  public repository: Repository<IUser>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async getById(id: string): Promise<IUser> {
    return this.repository.findOne({ id, enabled: true });
  }

  public async getByEmail(email: string): Promise<IUser> {
    return this.repository.findOne({ email, enabled: true });
  }

  public async create(payload: ICreateUser): Promise<IUser> {
    const newUser = this.repository.create(payload);
    return this.repository.save(newUser);
  }

  public async update(id: string, payload: IUpdateUser): Promise<IUser> {
    const updateUser = await this.repository.update(id, {
      ...payload,
      updated_at: moment(),
    });

    await this.repository.save({ id, updateUser });

    return this.getById(id);
  }

  public async remove(id: string, email: string): Promise<void> {
    await this.update(id, { enabled: false, email });
  }
}
