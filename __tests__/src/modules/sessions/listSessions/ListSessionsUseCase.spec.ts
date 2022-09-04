import { PAGINATION } from './../../../../../src/constants/index';
import { ListSessionsUseCase } from '../../../../../src/modules';
import { fakeUsers } from '../../../../mocks';
import { fakeSession, SessionRepositoryMock } from '../../../../mocks/sessions';

let listSessionUseCase: ListSessionsUseCase;
let sessionRpositoryMock: SessionRepositoryMock;

beforeEach(() => {
  sessionRpositoryMock = new SessionRepositoryMock();
  listSessionUseCase = new ListSessionsUseCase(sessionRpositoryMock);
});

describe('Testing listSessionsSessionUseCase', () => {
  it('must list all sessions when found', async () => {
    const page = 1;
    const sessions = await listSessionUseCase.execute({
      userId: fakeUsers[0].id,
      query: { page },
    });

    const total_ = fakeSession.filter(
      (session) => session.userId === fakeUsers[0].id && session.enabled,
    );

    const totalPages = Math.ceil(total_.length / PAGINATION.PER_PAGE);

    const expectedResponse = {
      response: total_.slice(page - 1, PAGINATION.PER_PAGE),
      page: sessions.page,
      count: sessions.response.length,
      perPage: PAGINATION.PER_PAGE,
      total: total_.length,
      totalPages,
      hasNext: page !== totalPages && page < totalPages,
    };

    expect(expectedResponse).toEqual(sessions);
    expect(sessions.response).not.toEqual([]);
  });

  it('must return empty list if sessions not found', async () => {
    const page = 1;
    return expect(
      await listSessionUseCase.execute({ userId: fakeUsers[3].id, query: { page } }),
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
