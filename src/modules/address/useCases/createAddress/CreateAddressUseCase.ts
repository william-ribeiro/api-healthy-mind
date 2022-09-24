import { inject, injectable } from 'tsyringe';

import { CONTAINER } from '@/constants';
import { AppError } from '@/errors';
import { IAddress, IAddressRepository, ICreateAddress } from '@/interfaces';
import { Validators } from '@/shared';

@injectable()
export class CreateAddressUseCase {
  constructor(
    @inject(CONTAINER.ADDRESS_REPOSITORY)
    private addressRepository: IAddressRepository,
  ) {}

  async execute(payload: ICreateAddress): Promise<IAddress> {
    try {
      await new Validators().address.validate(payload, { abortEarly: true });
    } catch (err: Error | any) {
      throw new AppError(err.errors[0]);
    }
    return this.addressRepository.create({ ...payload });
  }
}
