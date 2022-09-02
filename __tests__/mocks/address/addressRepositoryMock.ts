/* eslint-disable @typescript-eslint/require-await */

import {
  IAddress,
  IAddressRepository,
  ICreateAddress,
  IUpdateAddress,
} from '../../../src/interfaces';

import { fakeAddress } from './fakeAddress';

export class AddressRepositoryMock implements IAddressRepository {
  async getAddressById(addressId: number): Promise<IAddress> {
    return fakeAddress.find((address) => address.id === addressId);
  }

  async create(payload: ICreateAddress): Promise<IAddress> {
    const id = fakeAddress.length + 1;

    const index = fakeAddress.push({
      id,
      ...payload,
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return fakeAddress[index - 1];
  }

  async update(id: number, payload: IUpdateAddress): Promise<IAddress> {
    const index = fakeAddress.findIndex((user) => user.id === id);

    return (fakeAddress[index] = {
      ...fakeAddress[index],
      ...payload,
    });
  }

  async remove(id: number): Promise<void> {
    await this.update(id, { enabled: false });
  }
}
