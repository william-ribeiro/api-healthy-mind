/* eslint-disable @typescript-eslint/require-await */

import {
  ICreateCredentials,
  ICredentials,
  ICredentialsRepository,
  IUpdateCredentials,
} from '@/interfaces';
import { filterDefinedProperties } from '@/utils';
import { fakeCredentials } from './fakeCredentials';

export class CredentialsRepositoryMock implements ICredentialsRepository {
  async getCredentialByOwnerId(ownerId: string): Promise<ICredentials> {
    return fakeCredentials.find(({ ownerId: ownerId_ }) => ownerId_ === ownerId);
  }

  async create(payload: ICreateCredentials): Promise<ICredentials> {
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

  async update(ownerId: string, payload: IUpdateCredentials): Promise<ICredentials> {
    const index = fakeCredentials.findIndex(({ ownerId: ownerId_ }) => ownerId_ === ownerId);

    return (fakeCredentials[index] = {
      ...fakeCredentials[index],
      ...filterDefinedProperties(payload),
    });
  }

  async remove(ownerId: string): Promise<void> {
    const index = fakeCredentials.findIndex(({ ownerId: ownerId_ }) => ownerId_ === ownerId);
    fakeCredentials.splice(index, 1);
  }
}
