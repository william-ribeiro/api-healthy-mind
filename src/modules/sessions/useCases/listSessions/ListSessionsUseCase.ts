import { inject, injectable } from 'tsyringe';
import { CONTAINER, PAGINATION } from '../../../../constants';
import { IPaginate, ISession, ISessionRepository } from '../../../../interfaces';
import { parsePage } from '../../../../utils';

@injectable()
export class ListSessionsUseCase {
  constructor(
    @inject(CONTAINER.SESSIONS_REPOSITORY)
    private sessionRepository: ISessionRepository,
  ) {}

  async execute({ userId, query }): Promise<IPaginate<ISession[]>> {
    const { page = PAGINATION.PAGE } = query;

    const [response, total] = await this.sessionRepository.getAllSessions(
      userId,
      (parsePage(page) - 1) * PAGINATION.PER_PAGE,
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
