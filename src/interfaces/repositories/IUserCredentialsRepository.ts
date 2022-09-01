import { ICreateUserCredentials, IUpdateUserCredentials, IUserCredentials } from '../entities';

export interface IUserCredentialsRepository {
  getCredentialByUserId(userId: string): Promise<IUserCredentials>;
  create(payload: ICreateUserCredentials): Promise<IUserCredentials>;
  update(userId: string, payload: IUpdateUserCredentials): Promise<IUserCredentials>;
  remove(userId: string): Promise<void>;
}
