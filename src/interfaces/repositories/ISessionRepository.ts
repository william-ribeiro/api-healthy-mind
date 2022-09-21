import { ICreateSession, ISession, IUpdateSession } from '../entities/sessions';
import { IClinicalHistory } from '../views';

export interface ISessionRepository {
  getSessionById(sessionId: number, userId: string): Promise<ISession>;

  getAllSessions(skip: number, query: any): Promise<[ISession[], number]>;

  getClinicalHistoryByPatientId(patientId: string): Promise<IClinicalHistory[]>;

  filterSessions(field: string, skip: number, roleId: any): Promise<[ISession[], number]>;

  create(payload: ICreateSession): Promise<ISession>;

  update(sessionId: number, userId: string, payload: IUpdateSession): Promise<ISession>;

  remove(sessionId: number, userId: string): Promise<void>;
}
