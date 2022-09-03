import { fakePatients, PatientsRepositoryMock } from '../../../../mocks';
import { IPatient } from '../../../../../src/interfaces';
import { RemovePatientUseCase } from '../../../../../src/modules/patients';

let removePatientUseCase: RemovePatientUseCase;
let patientRepositoryMock: PatientsRepositoryMock;
let payload: IPatient;

beforeEach(() => {
  payload = fakePatients[0];

  patientRepositoryMock = new PatientsRepositoryMock();
  removePatientUseCase = new RemovePatientUseCase(patientRepositoryMock);
});

describe('Testing createUserUseCase', () => {
  it('must removed patient when passed a valid payload', async () => {
    await removePatientUseCase.execute(payload.id, payload.userId);

    const { enabled, email, document } = await patientRepositoryMock.getPatientById(
      payload.id,
      payload.userId,
    );

    expect(enabled).toEqual(false);
    expect(email).not.toEqual(payload.email);
    expect(document).not.toEqual(payload.document);
  });

  it('must return error when passed invalid patient', async () => {
    try {
      return expect(
        await patientRepositoryMock.getPatientById('failId', payload.userId),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Patient not found');
    }
  });
});
