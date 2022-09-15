import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors';
import { IAddress, IAddressRepository, ICreateAddress } from '../../../../interfaces';
import { CONTAINER } from './../../../../constants';
import { Validators } from './../../../../shared/validators';

@injectable()
export class CreateAddressUseCase {
  constructor(
    @inject(CONTAINER.ADDRESS_REPOSITORY)
    private addressRepository: IAddressRepository,
  ) {}

  async execute(payload: ICreateAddress): Promise<IAddress> {
    try {
      await new Validators().address.validate(payload, { abortEarly: true });

      return this.addressRepository.create({ ...payload });
    } catch (err: Error | any) {
      throw new AppError(err.errors[0]);
    }
  }
}
