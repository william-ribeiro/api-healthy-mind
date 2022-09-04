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
    const { page: page_ } = query;

    const page = parsePage(page_);

    const [response, total] = await this.sessionRepository.getAllSessions(
      userId,
      (page - 1) * PAGINATION.PER_PAGE,
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
