import { ICreatePatient, IGetPatientByAttribute, IPatient, IUpdatePatient } from '../entities';

export interface IPatientRepository {
  getPatientById(idPatient: string, idUser: string): Promise<IPatient>;
  getPatientByAttribute(attribute: IGetPatientByAttribute): Promise<IPatient>;
  create(payload: ICreatePatient): Promise<IPatient>;
  update(idPatient: string, idUser: string, payload: IUpdatePatient): Promise<IPatient>;
  remove(idPatient: string, idUser: string): Promise<void>;
}
