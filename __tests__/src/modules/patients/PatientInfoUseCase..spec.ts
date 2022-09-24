import { PatientInfoUseCase } from '@/modules';
import { fakePatients, PatientsRepositoryMock } from '../../../mocks';

let patientInfoUseCase: PatientInfoUseCase;
let patientRepositoryMock: PatientsRepositoryMock;

beforeEach(() => {
  patientRepositoryMock = new PatientsRepositoryMock();
  patientInfoUseCase = new PatientInfoUseCase(patientRepositoryMock);
});

describe('Testing listPatientsUseCase', () => {
  it('must list info patient when found', async () => {
    const patient = await patientInfoUseCase.execute({
      userId: fakePatients[0].userId,
      patientId: fakePatients[0].id,
    });

    const expectedPatient = fakePatients.find(
      (patient) =>
        patient.userId === fakePatients[0].userId &&
        patient.id == fakePatients[0].id &&
        patient.enabled,
    );

    delete expectedPatient.password;

    expect(expectedPatient).toEqual(patient);
  });

  it('must return error when passed invalid patientId', async () => {
    try {
      return expect(
        await patientInfoUseCase.execute({
          userId: fakePatients[0].userId,
          patientId: 'failed',
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Patient not found');
    }
  });
});
