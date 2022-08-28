import { IUser, ICreateUser } from '../entities';

export interface IUsersRepository {
  create(payload: ICreateUser): Promise<IUser>;
}
