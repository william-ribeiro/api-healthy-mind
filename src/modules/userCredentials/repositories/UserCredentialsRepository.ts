import moment from 'moment';
import { getRepository, Repository } from 'typeorm';
import {
  ICreateUserCredentials,
  IUpdateUserCredentials,
  IUserCredentials,
  IUserCredentialsRepository,
} from '../../../interfaces';
import { UserCredentials } from '../entities';

export class UserCredentialsRepository implements IUserCredentialsRepository {
  private repository: Repository<IUserCredentials>;

  constructor() {
    this.repository = getRepository(UserCredentials);
  }

  async getCredentialByUserId(userId: string): Promise<IUserCredentials> {
    return this.repository.findOne({ userId });
  }

  async create(payload: ICreateUserCredentials): Promise<IUserCredentials> {
    const newCredentials = this.repository.create(payload);
    return this.repository.save(newCredentials);
  }

  async update(userId: string, payload: IUpdateUserCredentials): Promise<IUserCredentials> {
    const { raw: updateCredential } = await this.repository
      .createQueryBuilder()
      .update({ ...payload, updatedAt: moment() })
      .where('userId=:userId', { userId })
      .returning('*')
      .execute();

    return updateCredential;
  }

  async remove(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }
}
