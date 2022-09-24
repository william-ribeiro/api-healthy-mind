import { ICreateUser, IDashboard, IUpdateUser, IUser } from '@/interfaces';

export interface IUsersRepository {
  getById(id: string): Promise<IUser>;
  getByEmail(email: string): Promise<IUser>;
  getDashboardByUserId(id: string): Promise<IDashboard>;
  create(payload: ICreateUser): Promise<IUser>;
  update(id: string, payload: IUpdateUser): Promise<IUser>;
  remove(id: string, email: string): Promise<void>;
}
