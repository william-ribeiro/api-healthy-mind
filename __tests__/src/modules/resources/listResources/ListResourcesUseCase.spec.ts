import { PAGINATION } from '../../../../../src/constants';
import { ListResourceUseCase } from '../../../../../src/modules';
import { fakeUsers } from '../../../../mocks';
import { fakeResources } from './../../../../mocks/resources/fakeResources';
import { ResourceRepositoryMock } from './../../../../mocks/resources/ResourceRepositoryMock';

let listResourcesUseCase: ListResourceUseCase;
let resouceRepositoryMock: ResourceRepositoryMock;

beforeEach(() => {
  resouceRepositoryMock = new ResourceRepositoryMock();
  listResourcesUseCase = new ListResourceUseCase(resouceRepositoryMock);
});

describe('Testing listResourcesUseCase', () => {
  it('must list all resources when found', async () => {
    const page = 1;
    const resources = await listResourcesUseCase.execute({
      userId: fakeUsers[0].id,
      query: { page },
    });

    const total_ = fakeResources.filter(
      (resources_) => resources_.userId === fakeUsers[0].id && resources_.enabled,
    );

    const totalPages = Math.ceil(total_.length / PAGINATION.PER_PAGE);

    const expectedResources = {
      response: total_.slice(page - 1, PAGINATION.PER_PAGE),
      page: resources.page,
      count: resources.response.length,
      perPage: PAGINATION.PER_PAGE,
      total: total_.length,
      totalPages,
      hasNext: page !== totalPages && page < totalPages,
    };
    expect(expectedResources).toEqual(resources);
    expect(resources.response).not.toEqual([]);
  });

  it('must return empty list if resources not found', async () => {
    const page = 1;

    return expect(
      await listResourcesUseCase.execute({ userId: fakeUsers[3].id, query: { page } }),
    ).toEqual({
      response: [],
      page,
      count: 0,
      perPage: PAGINATION.PER_PAGE,
      totalPages: 0,
      hasNext: false,
      total: 0,
    });
  });
});
