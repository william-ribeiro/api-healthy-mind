import { IPatient } from '../../../src/interfaces';
import { fakeAddress } from '../address';
import { fakeUsers } from '../users';

export const fakePatients: IPatient[] = [
  {
    id: '2b01e699-6b8a-4637-8113-8619b787b846',
    userId: fakeUsers[0].id,
    createdAt: new Date('2022-09-02T23:32:10.466Z'),
    updatedAt: new Date('2022-09-02T23:32:10.466Z'),
    addressId: fakeAddress[0].id,
    name: 'Paciente teste 1',
    email: 'pacienteteste1@email.com',
    document: '123456789',
    gender: 'Masculino',
    birthDate: '18/10/1998',
    phone: '53900000000',
    enabled: true,
  } as IPatient,
  {
    id: '77eb564e-a8ca-42cc-a77f-e6f4360d5b12',
    userId: fakeUsers[0].id,
    createdAt: new Date('2022-09-02T23:32:10.466Z'),
    updatedAt: new Date('2022-09-02T23:32:10.466Z'),
    addressId: fakeAddress[0].id,
    name: 'Paciente teste 2',
    email: 'pacienteteste2@email.com',
    document: '123456789',
    gender: 'Masculino',
    birthDate: '18/10/1998',
    phone: '53900000000',
    enabled: true,
  } as IPatient,
  {
    id: '75b66128-950a-40d6-a0cf-f22c8352640c',
    userId: fakeUsers[0].id,
    createdAt: new Date('2022-09-02T23:32:10.466Z'),
    updatedAt: new Date('2022-09-02T23:32:10.466Z'),
    addressId: fakeAddress[0].id,
    name: 'Paciente teste 3',
    email: 'pacienteteste3@email.com',
    document: '123456789',
    gender: 'Masculino',
    birthDate: '18/10/1998',
    phone: '53900000000',
    enabled: true,
  } as IPatient,
];
