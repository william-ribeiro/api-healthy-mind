/* eslint-disable @typescript-eslint/require-await */

import { v4 as uuidV4 } from 'uuid';
import { PAGINATION } from '../../../src/constants';
import {
  ICreatePatient,
  IGetPatientByAttribute,
  IPatient,
  IPatientRepository,
  IRemovePatient,
  IUpdatePatient,
} from '../../../src/interfaces';
import { buildClusters } from '../../../src/utils';

import { fakePatients } from './fakePatients';

export class PatientsRepositoryMock implements IPatientRepository {
  async getPatientById(idPatient: string, idUser: string): Promise<IPatient> {
    return fakePatients.find(
      (patient) => patient.id === idPatient && patient.userId === idUser && patient.enabled,
    );
  }

  async getLoginPatientById(patientId: string): Promise<IPatient> {
    return fakePatients.find((patient) => patient.id === patientId && patient.enabled);
  }

  async getPatientByAttribute(attribute: IGetPatientByAttribute): Promise<IPatient> {
    if (attribute.email) return fakePatients.find((patient) => patient.email === attribute.email);

    return fakePatients.find((patient) => patient.document === attribute.document);
  }

  async filterPatients(userId: string, field: string, skip: number): Promise<[IPatient[], number]> {
    const patients = fakePatients.filter(
      (patient) =>
        (patient.userId === userId && patient.enabled && patient.name.includes(field)) ||
        (patient.userId === userId && patient.enabled && patient.email.includes(field)),
    );

    const total = patients.length;

    const paginatePatients = !patients.length
      ? []
      : buildClusters(patients.slice(skip), PAGINATION.PER_PAGE)[0];

    return [paginatePatients, total];
  }

  async getAllPatients(userId: string, skip: number): Promise<[IPatient[], number]> {
    const patients = fakePatients.filter((patient) => patient.userId === userId && patient.enabled);

    const total = patients.length;

    const paginatePatients = !patients.length
      ? []
      : buildClusters(patients.slice(skip), PAGINATION.PER_PAGE)[0];

    return [paginatePatients, total];
  }

  async create(payload: ICreatePatient): Promise<IPatient> {
    const index = fakePatients.push({
      id: uuidV4(),
      ...payload,
      enabled: true,
      isFirstLogin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return fakePatients[index - 1];
  }

  async update(idPatient: string, idUser: string, payload: IUpdatePatient): Promise<IPatient> {
    const index = fakePatients.findIndex(
      (patient) => patient.id === idPatient && patient.userId === idUser,
    );

    return (fakePatients[index] = {
      ...fakePatients[index],
      ...payload,
    });
  }

  async remove(idPatient: string, idUser: string, payload: IRemovePatient): Promise<void> {
    await this.update(idPatient, idUser, { enabled: false, ...payload });
  }
}
