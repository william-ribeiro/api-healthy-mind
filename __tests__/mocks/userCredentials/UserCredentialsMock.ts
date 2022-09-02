import { ICreateUserCredentials } from './../../../src/interfaces/entities/userCredentials/ICreateUserCredentials';
/* eslint-disable @typescript-eslint/require-await */

import {
  IUpdateUserCredentials,
  IUserCredentials,
  IUserCredentialsRepository,
} from '../../../src/interfaces';
import { fakeCredentials } from './fakeCredentials';
import { filterDefinedProperties } from '../../../src/utils';

export class UserCredentialsRepositoryMock implements IUserCredentialsRepository {
  async getCredentialByUserId(userId: string): Promise<IUserCredentials> {
    return fakeCredentials.find(({ userId: userId_ }) => userId_ === userId);
  }

  async create(payload: ICreateUserCredentials): Promise<IUserCredentials> {
    const id = fakeCredentials.length + 1;

    const index = fakeCredentials.push({
      id,
      ...payload,
      isValid: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresIn: new Date(),
    });

    return fakeCredentials[index - 1];
  }

  async update(userId: string, payload: IUpdateUserCredentials): Promise<IUserCredentials> {
    const index = fakeCredentials.findIndex(({ userId: userId_ }) => userId_ === userId);

    return (fakeCredentials[index] = {
      ...fakeCredentials[index],
      ...filterDefinedProperties(payload),
    });
  }

  async remove(userId: string): Promise<void> {
    const index = fakeCredentials.findIndex(({ userId: userId_ }) => userId_ === userId);
    fakeCredentials.splice(index, 1);
  }
}
