import { CreatePatientUseCase } from '../../../../../src/modules/patients';
import { fakeUsers, PatientsRepositoryMock } from '../../../../mocks';
import { AddressRepositoryMock, fakeAddress } from '../../../../mocks/address';

let createPatientUseCase: CreatePatientUseCase;
let patientRepositoryMock: PatientsRepositoryMock;
let addressRepositoryMock: AddressRepositoryMock;
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
    password: 'firstLogin',
    isFirstLogin: true,
    roleId: 3,
  };

  patientRepositoryMock = new PatientsRepositoryMock();
  addressRepositoryMock = new AddressRepositoryMock();
  createPatientUseCase = new CreatePatientUseCase(patientRepositoryMock, addressRepositoryMock);
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

  it('must return create patient error when passed invalid payload', async () => {
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

  it('must return create patient error when user already exists', async () => {
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

  it('must return create patient error when address not found', async () => {
    try {
      payload.addressId = 999;

      return expect(
        await createPatientUseCase.execute({
          ...payload,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Address not found');
    }
  });
});
