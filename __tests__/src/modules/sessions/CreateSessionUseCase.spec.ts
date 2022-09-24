import moment from 'moment';

import { CreateSessionUseCase } from '@/modules/sessions';
import {
  fakePatients,
  fakeResources,
  fakeUsers,
  PatientsRepositoryMock,
  ResourceRepositoryMock,
  SessionRepositoryMock,
} from '../../../mocks';

let createSessionUseCase: CreateSessionUseCase;
let sessionRepositoryMock: SessionRepositoryMock;
let patientRepositoryMock: PatientsRepositoryMock;
let resourceRepositoryMock: ResourceRepositoryMock;
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
    service: 'remote testing',
    resourceId: fakeResources[0].id,
    appointmentDate: moment().add(1, 'd').format(),
  };

  patientRepositoryMock = new PatientsRepositoryMock();
  sessionRepositoryMock = new SessionRepositoryMock();
  resourceRepositoryMock = new ResourceRepositoryMock();
  createSessionUseCase = new CreateSessionUseCase(
    sessionRepositoryMock,
    patientRepositoryMock,
    resourceRepositoryMock,
  );
});

describe('Testing createSessionUseCase', () => {
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

  it('must return create session error when resource not found', async () => {
    payload.resourceId = 999;
    try {
      return expect(
        await createSessionUseCase.execute(payload.userId, {
          ...payload,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Resource not found');
    }
  });
});
