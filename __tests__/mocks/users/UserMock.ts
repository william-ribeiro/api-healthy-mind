/* eslint-disable @typescript-eslint/require-await */
import { v4 as uuidV4 } from 'uuid';

import { ICreateUser, IUpdateUser, IUser, IUsersRepository } from '../../../src/interfaces';
import { fakeUsers } from './fakeUsers';

export class UsersRepositoryMock implements IUsersRepository {
  async getById(id: string): Promise<IUser> {
    return fakeUsers.find((user) => user.id === id && user.enabled);
  }

  async getByEmail(email: string): Promise<IUser> {
    return fakeUsers.find((user) => user.email === email && user.enabled);
  }

  async create(payload: ICreateUser): Promise<IUser> {
    const id = uuidV4();

    delete payload.confirmPassword;

    const index = fakeUsers.push({
      id,
      ...payload,
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return fakeUsers[index - 1];
  }

  async update(id: string, payload: IUpdateUser): Promise<IUser> {
    const index = fakeUsers.findIndex((user) => user.id === id);

    return (fakeUsers[index] = {
      ...fakeUsers[index],
      ...payload,
    });
  }

  async remove(id: string, email: string): Promise<void> {
    await this.update(id, { enabled: false, email });
  }
}
