import { ICreateSession, ISession, IUpdateSession } from '../entities/sessions';

export interface ISessionRepository {
  getSessionById(sessionId: number, userId: string): Promise<ISession>;

  getAllSessions(userId: string): Promise<ISession[]>;

  create(payload: ICreateSession): Promise<ISession>;

  update(sessionId: number, userId: string, payload: IUpdateSession): Promise<ISession>;

  remove(sessionId: number, userId: string): Promise<void>;
}
