import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '../../../../constants';
import { IDashboard, IUsersRepository } from '../../../../interfaces';

@injectable()
export class DashboardUseCase {
  constructor(
    @inject(CONTAINER.USERS_REPOSITORY)
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ userId }): Promise<IDashboard> {
    const dashboard = await this.usersRepository.getDashboardByUserId(userId);

    return dashboard;
  }
}
