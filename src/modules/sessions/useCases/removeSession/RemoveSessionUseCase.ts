import { inject, injectable } from 'tsyringe';

import { CONTAINER } from '@/constants';
import { AppError } from '@/errors';
import { ISessionRepository } from '@/interfaces';

@injectable()
export class RemoveSessionUseCase {
  constructor(
    @inject(CONTAINER.SESSIONS_REPOSITORY)
    private sessionRepository: ISessionRepository,
  ) {}

  async execute(sessionId: number, userId: string): Promise<void> {
    const session = await this.sessionRepository.getSessionById(sessionId, userId);

    if (!session) throw new AppError('Session not found', 404);

    await this.sessionRepository.remove(sessionId, userId);
  }
}
