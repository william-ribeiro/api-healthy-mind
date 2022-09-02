import { CONTAINER } from './../../../../constants/index';
import { inject, injectable } from 'tsyringe';
import { IAddress, IAddressRepository, IUpdateAddress } from '../../../../interfaces';
import { AppError } from '../../../../errors';
import { filterDefinedProperties } from '../../../../utils';

@injectable()
export class UpdateAddressUseCase {
  constructor(
    @inject(CONTAINER.ADDRESS_REPOSITORY)
    private addressRepository: IAddressRepository,
  ) {}

  async execute(addressId: number, payload: IUpdateAddress): Promise<IAddress> {
    if (!Object.values(payload).length) throw new AppError('Invalid payload');
    const address = await this.addressRepository.getAddressById(addressId);

    if (!address) throw new AppError('Address not found', 404);

    return this.addressRepository.update(addressId, { ...filterDefinedProperties(payload) });
  }
}
