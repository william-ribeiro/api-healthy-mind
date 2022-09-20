import {
  ICreatePatient,
  IGetPatientByAttribute,
  IPatient,
  IRemovePatient,
  IUpdatePatient,
} from '../entities';

export interface IPatientRepository {
  getPatientById(patientId: string, userId: string): Promise<IPatient>;
  getLoginPatientById(patientId: string): Promise<IPatient>;
  getPatientByAttribute(attribute: IGetPatientByAttribute): Promise<IPatient>;
  getAllPatients(userId: string, skip: number): Promise<[IPatient[], number]>;
  filterPatients(userId: string, field: string, skip: number): Promise<[IPatient[], number]>;
  create(payload: ICreatePatient): Promise<IPatient>;
  update(patientId: string, userId: string, payload: IUpdatePatient): Promise<IPatient>;
  remove(patientId: string, userId: string, payload: IRemovePatient): Promise<void>;
}
