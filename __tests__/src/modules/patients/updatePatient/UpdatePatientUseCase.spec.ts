import { fakePatients, PatientsRepositoryMock } from '../../../../mocks';
import { IPatient } from '../../../../../src/interfaces';
import { UpdatePatientUseCase } from '../../../../../src/modules/patients';
import { AddressRepositoryMock } from '../../../../mocks/address';

let updatePatientUseCase: UpdatePatientUseCase;
let patientRepositoryMock: PatientsRepositoryMock;
let addressRepositoryMock: AddressRepositoryMock;
let payload: IPatient;

beforeEach(() => {
  payload = fakePatients[0];

  patientRepositoryMock = new PatientsRepositoryMock();
  addressRepositoryMock = new AddressRepositoryMock();
  updatePatientUseCase = new UpdatePatientUseCase(patientRepositoryMock, addressRepositoryMock);
});

describe('Testing updatePatientUseCase', () => {
  it('must return updated patient when a passed valid payload', async () => {
    payload.name = 'Update Patient';

    const updatePatient = await updatePatientUseCase.execute(payload.id, payload.userId, payload);

    const expectResponse = await patientRepositoryMock.getPatientById(
      updatePatient.id,
      updatePatient.userId,
    );

    expect(updatePatient).toEqual(expectResponse);
  });

  it('must return update patient error when payload empty', async () => {
    try {
      return expect(
        await updatePatientUseCase.execute(payload.id, payload.userId, {}),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid payload');
    }
  });

  it('must return update patient error when passed invalid email ', async () => {
    try {
      return expect(
        await updatePatientUseCase.execute(payload.id, payload.userId, {
          email: 'invalid',
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid email');
    }
  });

  it('must return update patient error when email in use', async () => {
    try {
      return expect(
        await updatePatientUseCase.execute(payload.id, payload.userId, {
          email: fakePatients[1].email,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Email in use');
    }
  });

  it('must return update patient error when patient already exists', async () => {
    try {
      return expect(
        await updatePatientUseCase.execute(payload.id, payload.userId, {
          document: fakePatients[1].document,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Patient already exists');
    }
  });

  it('must return update patient error when address not found', async () => {
    payload.addressId = 998;
    try {
      return expect(
        await updatePatientUseCase.execute(payload.id, payload.userId, {
          ...payload,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Address not found');
    }
  });
});
