import {
  ICreatePatient,
  IGetPatientByAttribute,
  IPatient,
  IUpdatePatient,
  IRemovePatient,
} from '../entities';

export interface IPatientRepository {
  getPatientById(patientId: string, userId: string): Promise<IPatient>;
  getPatientByAttribute(attribute: IGetPatientByAttribute): Promise<IPatient>;
  listAllPatients(userId: string): Promise<IPatient[]>;
  create(payload: ICreatePatient): Promise<IPatient>;
  update(patientId: string, userId: string, payload: IUpdatePatient): Promise<IPatient>;
  remove(patientId: string, userId: string, payload: IRemovePatient): Promise<void>;
}
