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
    const sessions = await listSessionUseCase.execute(fakeUsers[0].id);

    const expectedSessions = fakeSession.filter((fake) => fake.enabled);
    expect(expectedSessions).toEqual(sessions);
  });

  it('must return empty list if sessions not found', async () => {
    return expect(await listSessionUseCase.execute(fakeUsers[3].id)).toEqual([]);
  });
});
