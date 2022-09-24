import { ISession } from '@/interfaces';
import { RemoveSessionUseCase } from '@/modules/sessions';
import { fakeSession, SessionRepositoryMock } from '../../../mocks';

let removeSessionUseCase: RemoveSessionUseCase;
let sessionRpositoryMock: SessionRepositoryMock;
let payload: ISession;

beforeEach(() => {
  payload = fakeSession[1];
  sessionRpositoryMock = new SessionRepositoryMock();
  removeSessionUseCase = new RemoveSessionUseCase(sessionRpositoryMock);
});

describe('Testing removeSessionUseCase', () => {
  it('must removed session when passed a valid sessionId', async () => {
    await removeSessionUseCase.execute(payload.id, payload.userId);

    expect(await sessionRpositoryMock.getSessionById(payload.id, payload.userId)).toBeUndefined();
  });

  it('must return error when passed invalid sessionId', async () => {
    try {
      return expect(await removeSessionUseCase.execute(999, payload.userId)).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Session not found');
    }
  });
});
