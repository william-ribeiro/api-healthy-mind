import moment from 'moment';
import { getRepository, Repository } from 'typeorm';
import { IAddressRepository, IAddress, ICreateAddress, IUpdateAddress } from '../../../interfaces';
import { Address } from '../entities';

export class AddressRepository implements IAddressRepository {
  private repository: Repository<IAddress>;
  constructor() {
    this.repository = getRepository(Address);
  }
  async getAddressById(id: number): Promise<IAddress> {
    return this.repository.findOne({ id, enabled: true });
  }

  async create(payload: ICreateAddress): Promise<IAddress> {
    const newAddress = this.repository.create(payload);
    return this.repository.save(newAddress);
  }

  async update(id: number, payload: IUpdateAddress): Promise<IAddress> {
    const { raw: updateAddress } = await this.repository
      .createQueryBuilder()
      .update({ ...payload, updatedAt: moment() })
      .where('id=:id', { id })
      .returning('*')
      .execute();

    return updateAddress;
  }

  async remove(id: number): Promise<void> {
    await this.update(id, { enabled: false });
  }
}
