import { inject, injectable } from 'tsyringe';

import { CONTAINER, PAGINATION, ROLE_IDS } from '@/constants';
import { IPaginate, ISession, ISessionRepository } from '@/interfaces';
import { parsePage } from '@/utils';

@injectable()
export class ListSessionsUseCase {
  constructor(
    @inject(CONTAINER.SESSIONS_REPOSITORY)
    private sessionRepository: ISessionRepository,
  ) {}

  async execute({ userId, query, roleId }): Promise<IPaginate<ISession[]>> {
    const { page = PAGINATION.PAGE } = query;

    const where = roleId === ROLE_IDS.PROFESSIONAL ? { userId } : { patientId: userId };

    const [response, total] = await this.sessionRepository.getAllSessions(
      (parsePage(page) - 1) * PAGINATION.PER_PAGE,
      where,
    );
    const totalPages = Math.ceil(total / PAGINATION.PER_PAGE);

    return {
      response,
      page,
      count: response.length,
      perPage: PAGINATION.PER_PAGE,
      totalPages,
      hasNext: page !== totalPages && page < totalPages,
      total,
    };
  }
}
