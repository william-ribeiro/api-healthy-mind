import { inject, injectable } from 'tsyringe';

import { CONTAINER, PAGINATION } from '@/constants';
import { IGetAllResources, IPaginate, IResource, IResourceRepository } from '@/interfaces';
import { parsePage } from '@/utils';

@injectable()
export class ListResourceUseCase {
  constructor(
    @inject(CONTAINER.RESOURCE_REPOSITORY)
    private resourceRepository: IResourceRepository,
  ) {}

  async execute({ userId, query }: IGetAllResources): Promise<IPaginate<IResource[]>> {
    const { page = PAGINATION.PAGE } = query;

    const [response, total] = await this.resourceRepository.getAllResources({
      userId,
      skip: (parsePage(page.toString()) - 1) * PAGINATION.PER_PAGE,
    });

    const totalPages = Math.ceil(total / PAGINATION.PER_PAGE);

    return {
      response,
      page: +page,
      count: response.length,
      perPage: PAGINATION.PER_PAGE,
      totalPages,
      hasNext: page !== totalPages && page < totalPages,
      total,
    };
  }
}
