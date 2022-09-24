import { CreatePatientUseCase } from '@/modules/patients';
import { AddressRepositoryMock, fakeUsers, PatientsRepositoryMock } from '../../../mocks';

let createPatientUseCase: CreatePatientUseCase;
let patientRepositoryMock: PatientsRepositoryMock;
let addressRepositoryMock: AddressRepositoryMock;
let payload: any;

beforeEach(() => {
  payload = {
    userId: fakeUsers[0].id,
    name: 'Pacient testing',
    email: 'pacienttesting@email.com',
    document: 'documenttesting',
    gender: 'gender testing',
    birthDate: 'birthDate testing',
    phone: 'phone testing',
    password: 'firstLogin',
    isFirstLogin: true,
    roleId: 3,
    address: {
      postalCode: '11111-111',
      street: 'test street',
      number: 'test number',
      details: 'test details',
      district: 'test centro',
      city: 'test city',
      state: 'test state',
      country: 'test country',
    },
  };

  patientRepositoryMock = new PatientsRepositoryMock();
  addressRepositoryMock = new AddressRepositoryMock();
  createPatientUseCase = new CreatePatientUseCase(patientRepositoryMock, addressRepositoryMock);
});

describe('Testing createPatientUseCase', () => {
  it('must return created patient when passed a valid payload', async () => {
    const patient = await createPatientUseCase.execute({
      ...payload,
    });

    const expectResponse = await patientRepositoryMock.getPatientById(patient.id, patient.userId);

    expect(patient).toEqual({ ...expectResponse, password: patient.password });
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
});
