import moment from 'moment';
import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '../../../../constants';
import { AppError } from '../../../../errors';
import { ICredentialsRepository, IUsersRepository } from '../../../../interfaces';

@injectable()
export class RemoveUserUseCase {
  constructor(
    @inject(CONTAINER.USERS_REPOSITORY)
    private repository: IUsersRepository,
    @inject(CONTAINER.CREDENTIALS_REPOSITORY)
    private credentialsRepository: ICredentialsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.repository.getById(id);

    if (!user) throw new AppError('User not found', 404);

    const email = `${moment().unix()}_${user.email}`;

    await Promise.all([this.repository.remove(id, email), this.credentialsRepository.remove(id)]);
  }
}
