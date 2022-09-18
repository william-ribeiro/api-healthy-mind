import moment from 'moment';
import { getRepository, Repository } from 'typeorm';
import {
  ICreateCredentials,
  ICredentials,
  ICredentialsRepository,
  IUpdateCredentials,
} from '../../../interfaces';
import { Credentials } from '../entities';

export class CredentialsRepository implements ICredentialsRepository {
  private repository: Repository<ICredentials>;

  constructor() {
    this.repository = getRepository(Credentials);
  }

  async getCredentialByOwnerId(ownerId: string): Promise<ICredentials> {
    return this.repository.findOne({ ownerId });
  }

  async create(payload: ICreateCredentials): Promise<ICredentials> {
    const newCredentials = this.repository.create(payload);
    return this.repository.save(newCredentials);
  }

  async update(ownerId: string, payload: IUpdateCredentials): Promise<ICredentials> {
    const { raw: updateCredential } = await this.repository
      .createQueryBuilder()
      .update({ ...payload, updatedAt: moment() })
      .where('ownerId=:ownerId', { ownerId })
      .returning('*')
      .execute();

    return updateCredential;
  }

  async remove(ownerId: string): Promise<void> {
    await this.repository.delete({ ownerId });
  }
}
