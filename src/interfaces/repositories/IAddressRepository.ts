import { IAddress, ICreateAddress, IUpdateAddress } from '../entities';

export interface IAddressRepository {
  getAddressById(id: number): Promise<IAddress>;
  create(payload: ICreateAddress): Promise<IAddress>;
  update(id: number, payload: IUpdateAddress): Promise<IAddress>;
  remove(id: number): Promise<void>;
}
