import { ICreatePatients, IPatient, IUpdatePatients } from '../entities';

export interface IPatientsRepository {
  getPatientById(idPatient: string, idUser: string): Promise<IPatient>;
  create(payload: ICreatePatients): Promise<IPatient>;
  update(idPatient: string, idUser: string, payload: IUpdatePatients): Promise<IPatient>;
  remove(idPatient: string, idUser: string): Promise<void>;
}
