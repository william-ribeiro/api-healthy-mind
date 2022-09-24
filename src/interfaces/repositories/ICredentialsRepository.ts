import { ICreateCredentials, ICredentials, IUpdateCredentials } from '@/interfaces';

export interface ICredentialsRepository {
  getCredentialByOwnerId(ownerId: string): Promise<ICredentials>;
  create(payload: ICreateCredentials): Promise<ICredentials>;
  update(ownerId: string, payload: IUpdateCredentials): Promise<ICredentials>;
  remove(ownerId: string): Promise<void>;
}
