import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '../../../../constants';
import { ISession, ISessionRepository } from '../../../../interfaces';

@injectable()
export class ListSessionsUseCase {
  constructor(
    @inject(CONTAINER.SESSIONS_REPOSITORY)
    private sessionRepository: ISessionRepository,
  ) {}

  async execute(userId: string): Promise<ISession[]> {
    return this.sessionRepository.getAllSessions(userId);
  }
}
