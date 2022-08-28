import moment from 'moment';
import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '../../../../constants';
import { AppError } from '../../../../errors';
import { IUsersRepository } from '../../../../interfaces';

@injectable()
export class RemoveUserUseCase {
  constructor(
    @inject(CONTAINER.USERS_REPOSITORY)
    private repository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.repository.getById(id);

    if (!user) throw new AppError('User not found', 404);

    const email = `${moment().unix()}_${user.email}`;

    await this.repository.remove(id, email);
  }
}
