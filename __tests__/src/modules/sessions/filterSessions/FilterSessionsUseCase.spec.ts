import { PAGINATION } from '../../../../../src/constants';
import { FilterSessionsUseCase } from '../../../../../src/modules';
import { fakeUsers } from '../../../../mocks';
import { fakeSession, SessionRepositoryMock } from '../../../../mocks/sessions';

let filterSessionsUseCase: FilterSessionsUseCase;
let sessionRepositoryMock: SessionRepositoryMock;

beforeEach(() => {
  sessionRepositoryMock = new SessionRepositoryMock();
  filterSessionsUseCase = new FilterSessionsUseCase(sessionRepositoryMock);
});

describe('Testing filterSessionsUseCase', () => {
  it('must list all sessions when found by subject or service', async () => {
    const page = 1;
    const field = 'remo';
    const patients = await filterSessionsUseCase.execute({
      userId: fakeUsers[0].id,
      field,
      query: { page },
      roleId: 2,
    });

    const total_ = fakeSession.filter(
      (session) =>
        (session.userId === fakeUsers[0].id &&
          session.enabled &&
          session.subject.includes(field)) ||
        (session.userId === fakeUsers[0].id && session.enabled && session.service.includes(field)),
    );

    const totalPages = Math.ceil(total_.length / PAGINATION.PER_PAGE);

    const expectedPatients = {
      response: total_.slice(page - 1, PAGINATION.PER_PAGE),
      page: patients.page,
      count: patients.response.length,
      perPage: PAGINATION.PER_PAGE,
      total: total_.length,
      totalPages,
      hasNext: page !== totalPages && page < totalPages,
    };
    expect(expectedPatients).toEqual(patients);
    expect(patients.response).not.toEqual([]);
  });

  it('must return empty list if sessions not found', async () => {
    const page = 1;
    const field = 'notfound';
    return expect(
      await filterSessionsUseCase.execute({
        userId: fakeUsers[3].id,
        field,
        query: { page },
        roleId: 2,
      }),
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
