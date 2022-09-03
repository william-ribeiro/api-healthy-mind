/* eslint-disable @typescript-eslint/require-await */

import { v4 as uuidV4 } from 'uuid';
import {
  ICreatePatient,
  IGetPatientByAttribute,
  IPatient,
  IPatientRepository,
  IRemovePatient,
  IUpdatePatient,
} from '../../../src/interfaces';

import { fakePatients } from './fakePatients';

export class PatientsRepositoryMock implements IPatientRepository {
  async getPatientById(idPatient: string, idUser: string): Promise<IPatient> {
    return fakePatients.find(
      (patient) => patient.id === idPatient && patient.userId === idUser && patient.enabled,
    );
  }

  async getPatientByAttribute(attribute: IGetPatientByAttribute): Promise<IPatient> {
    if (attribute.email) return fakePatients.find((patient) => patient.email === attribute.email);

    return fakePatients.find((patient) => patient.document === attribute.document);
  }

  async listAllPatients(userId: string): Promise<IPatient[]> {
    return fakePatients.filter((patient) => patient.userId === userId && patient.enabled);
  }

  async create(payload: ICreatePatient): Promise<IPatient> {
    const index = fakePatients.push({
      id: uuidV4(),
      ...payload,
      enabled: true,
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
