import { getRepository, Repository } from 'typeorm';
import { ICreateUser, IUser, IUsersRepository } from '../../../interfaces';
import { User } from '../entities';

export class UsersRepository implements IUsersRepository {
  public repository: Repository<IUser>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create(payload: ICreateUser): Promise<IUser> {
    const newUser = this.repository.create(payload);
    return this.repository.save(newUser);
  }
}
