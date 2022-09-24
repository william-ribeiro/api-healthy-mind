import { inject, injectable } from 'tsyringe';

import { CONTAINER } from '@/constants';
import { AppError } from '@/errors';
import { IAddress, IAddressRepository, IUpdateAddress } from '@/interfaces';
import { filterDefinedProperties } from '@/utils';

@injectable()
export class UpdateAddressUseCase {
  constructor(
    @inject(CONTAINER.ADDRESS_REPOSITORY)
    private addressRepository: IAddressRepository,
  ) {}

  async execute(addressId: number, payload: IUpdateAddress): Promise<IAddress> {
    if (typeof 'object' && !Object.values(payload).length) throw new AppError('Invalid payload');
    const address = await this.addressRepository.getAddressById(addressId);

    if (!address) throw new AppError('Address not found', 404);

    return this.addressRepository.update(addressId, { ...filterDefinedProperties(payload) });
  }
}
