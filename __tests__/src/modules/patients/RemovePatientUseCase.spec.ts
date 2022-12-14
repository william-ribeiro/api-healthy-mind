import { IPatient } from '@/interfaces';
import { RemovePatientUseCase } from '@/modules/patients';
import { fakePatients, PatientsRepositoryMock } from '../../../mocks';

let removePatientUseCase: RemovePatientUseCase;
let patientRepositoryMock: PatientsRepositoryMock;
let payload: IPatient;

beforeEach(() => {
  payload = fakePatients[0];

  patientRepositoryMock = new PatientsRepositoryMock();
  removePatientUseCase = new RemovePatientUseCase(patientRepositoryMock);
});

describe('Testing removeUserUseCase', () => {
  it('must removed patient when passed a valid patientId', async () => {
    await removePatientUseCase.execute(payload.id, payload.userId);

    expect(await patientRepositoryMock.getPatientById(payload.id, payload.userId)).toBeUndefined();
  });

  it('must return error when passed invalid patientId', async () => {
    try {
      return expect(
        await patientRepositoryMock.getPatientById('failId', payload.userId),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Patient not found');
    }
  });
});
