import { inject, injectable } from 'tsyringe';

import { CONTAINER, PAGINATION, ROLE_IDS } from '@/constants';
import { IPaginate, ISession, ISessionRepository } from '@/interfaces';
import { parsePage } from '@/utils';

@injectable()
export class FilterSessionsUseCase {
  constructor(
    @inject(CONTAINER.SESSIONS_REPOSITORY)
    private sessionRespository: ISessionRepository,
  ) {}

  async execute({ userId, field = '', query, roleId }): Promise<IPaginate<ISession[]>> {
    const { page = PAGINATION.PAGE } = query;

    const where =
      roleId === ROLE_IDS.PROFESSIONAL
        ? { userId, enabled: true }
        : { patientId: userId, enabled: true };

    const [response, total] = await this.sessionRespository.filterSessions(
      field,
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
