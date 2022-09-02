import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '../../../../constants';
import { AppError } from '../../../../errors';
import { IAddressRepository } from '../../../../interfaces';

@injectable()
export class RemoveAddressUseCase {
  constructor(
    @inject(CONTAINER.ADDRESS_REPOSITORY)
    private addressRepository: IAddressRepository,
  ) {}

  async execute(addressId: number): Promise<void> {
    const address = await this.addressRepository.getAddressById(addressId);

    if (!address) throw new AppError('Address not found');

    await this.addressRepository.remove(addressId);
  }
}
