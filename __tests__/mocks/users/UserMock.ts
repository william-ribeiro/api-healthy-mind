import { getRepository, Repository } from 'typeorm';

import { IUser } from '../../../src/interfaces';
import { fakeUsers } from './fakeUsers';

export class UserMock implements IUser {
  created_at: Date;
  updated_at: Date;
  name: string;
  password: string;
  id: string;
  email: string;
  enabled: boolean;

  public fakeUsers: IUser[];

  constructor() {
    this.fakeUsers = fakeUsers;
  }
  repository(): Repository<IUser> {
    return getRepository(UserMock);
  }

  async getById(id: string): Promise<IUser[] | []> {
    return this.fakeUsers.filter((user) => user.id === id);
  }
}
