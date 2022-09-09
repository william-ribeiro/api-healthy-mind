import moment from 'moment';
import { fakePatients, fakeUsers, PatientsRepositoryMock } from '../../../../mocks';
import { CreateSessionUseCase } from '../../../../../src/modules';
import { SessionRepositoryMock } from '../../../../mocks/sessions';

let createSessionUseCase: CreateSessionUseCase;
let sessionRepositoryMock: SessionRepositoryMock;
let patientRepositoryMock: PatientsRepositoryMock;
let payload: any;

beforeEach(() => {
  payload = {
    userId: fakeUsers[0].id,
    patientId: fakePatients[0].id,
    status: 'testing status',
    subject: 'testing subject',
    duration: '00:30',
    type: 'testing typ',
    comments: 'testing comments',
    appointmentDate: moment().add(1, 'd').format(),
  };

  patientRepositoryMock = new PatientsRepositoryMock();
  sessionRepositoryMock = new SessionRepositoryMock();
  createSessionUseCase = new CreateSessionUseCase(sessionRepositoryMock, patientRepositoryMock);
});

describe('Testing createSessionUseCase', () => {
  //TO DO implementar o teste de authenticação

  it('must return created patient when passed a valid payload', async () => {
    const session = await createSessionUseCase.execute(payload.userId, {
      ...payload,
    });

    const expectResponse = await sessionRepositoryMock.getSessionById(session.id, session.userId);

    expect(session).toEqual(expectResponse);
  });

  it('must return create session error when passed payload empty', async () => {
    try {
      return expect(await createSessionUseCase.execute(payload.userId, {} as any)).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid payload');
    }
  });

  it('must return create session error when passed invalid payload', async () => {
    payload.status = '';

    try {
      return expect(
        await createSessionUseCase.execute(payload.userId, {
          ...payload,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid status');
    }
  });

  it('must return create session error when patient not found', async () => {
    try {
      return expect(
        await createSessionUseCase.execute('999', {
          ...payload,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Patient not found');
    }
  });
});
