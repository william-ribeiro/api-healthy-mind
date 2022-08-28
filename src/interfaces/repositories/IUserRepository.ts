import { IUser, ICreateUser, IUpdateUser } from '../entities';

export interface IUsersRepository {
  getById(id: string): Promise<IUser>;
  create(payload: ICreateUser): Promise<IUser>;
  update(id: string, payload: IUpdateUser): Promise<IUser>;
  remove(id: string, email: string): Promise<void>;
}
