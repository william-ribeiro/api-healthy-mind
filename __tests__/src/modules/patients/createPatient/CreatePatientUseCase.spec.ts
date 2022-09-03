import { fakeUsers, PatientsRepositoryMock } from '../../../../mocks';
import { CreatePatientUseCase } from '../../../../../src/modules/patients';
import { fakeAddress } from '../../../../mocks/address';

let createPatientUseCase: CreatePatientUseCase;
let patientRepositoryMock: PatientsRepositoryMock;
let payload: any;

beforeEach(() => {
  payload = {
    userId: fakeUsers[0].id,
    addressId: fakeAddress[0].id,
    name: 'Pacient testing',
    email: 'pacienttesting@email.com',
    document: 'documenttesting',
    gender: 'gender testing',
    birthDate: 'birthDate testing',
    phone: 'phone testing',
  };

  patientRepositoryMock = new PatientsRepositoryMock();
  createPatientUseCase = new CreatePatientUseCase(patientRepositoryMock);
});

describe('Testing createPatientUseCase', () => {
  //TO DO implementar o teste de authenticação

  it('must return created patient when passed a valid payload', async () => {
    const patient = await createPatientUseCase.execute({
      ...payload,
    });

    const expectResponse = await patientRepositoryMock.getPatientById(patient.id, patient.userId);

    expect(patient).toEqual(expectResponse);
  });

  it('must return error when passed invalid payload', async () => {
    payload.name = '';

    try {
      return expect(
        await createPatientUseCase.execute({
          ...payload,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid name');
    }
  });

  it('must return error when user already exists', async () => {
    try {
      return expect(
        await createPatientUseCase.execute({
          ...payload,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Patient already exists');
    }
  });
});
