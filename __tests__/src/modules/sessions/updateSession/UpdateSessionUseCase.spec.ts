import { ISession } from '../../../../../src/interfaces';
import { fakePatients, PatientsRepositoryMock, ResourceRepositoryMock } from '../../../../mocks';
import { fakeSession, SessionRepositoryMock } from '../../../../mocks/sessions';
import { UpdateSessionUseCase } from '../..//../../../src/modules';

let updateSessionUseCase: UpdateSessionUseCase;
let sessionRepositoryMock: SessionRepositoryMock;
let patientRepositoryMock: PatientsRepositoryMock;
let resourceRepositoryMock: ResourceRepositoryMock;
let payload: ISession;

beforeEach(() => {
  payload = fakeSession[0];

  sessionRepositoryMock = new SessionRepositoryMock();
  patientRepositoryMock = new PatientsRepositoryMock();
  resourceRepositoryMock = new ResourceRepositoryMock();
  updateSessionUseCase = new UpdateSessionUseCase(
    sessionRepositoryMock,
    patientRepositoryMock,
    resourceRepositoryMock,
  );
});

describe('Testing updateSessionUseCase', () => {
  it('must return updated session when a passed valid payload', async () => {
    payload.status = 'Update status';

    const updateStatus = await updateSessionUseCase.execute(payload.id, payload.userId, payload);

    const expectResponse = await sessionRepositoryMock.getSessionById(
      updateStatus.id,
      updateStatus.userId,
    );

    expect(updateStatus).toEqual(expectResponse);
  });

  it('must return update session error when payload empty', async () => {
    try {
      return expect(
        await updateSessionUseCase.execute(payload.id, payload.userId, {}),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid payload');
    }
  });

  it('must return update session error when passed invalid patientId ', async () => {
    try {
      return expect(
        await updateSessionUseCase.execute(payload.id, payload.userId, {
          patientId: '9999',
          status: 'update status',
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Patient not found');
    }
  });

  it('must return update session error when passed invalid resourceId ', async () => {
    try {
      return expect(
        await updateSessionUseCase.execute(payload.id, payload.userId, {
          resourceId: 999,
          patientId: fakePatients[1].id,
          status: 'update status',
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Resource not found');
    }
  });

  it('must return update session error when passed sessionId disabled', async () => {
    const sessionDisabled = fakeSession[3];
    try {
      return expect(
        await updateSessionUseCase.execute(sessionDisabled.id, sessionDisabled.userId, {
          ...sessionDisabled,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Session not found');
    }
  });
});
