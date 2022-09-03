import moment from 'moment';
import { getRepository, Repository } from 'typeorm';
import { ICreateSession, ISession, ISessionRepository, IUpdateSession } from '../../../interfaces';
import { Session } from '../entities';

export class SessionRepository implements ISessionRepository {
  private sessionRepository: Repository<ISession>;

  constructor() {
    this.sessionRepository = getRepository(Session);
  }

  async getSessionById(id: number, userId: string): Promise<ISession> {
    return this.sessionRepository.findOne({ id, userId, enabled: true });
  }

  async getAllSessions(userId: string): Promise<ISession[]> {
    return this.sessionRepository.find({ userId, enabled: true });
  }

  async create(payload: ICreateSession): Promise<ISession> {
    const newSession = this.sessionRepository.create(payload);
    return this.sessionRepository.save(newSession);
  }

  async update(sessionId: number, userId: string, payload: IUpdateSession): Promise<ISession> {
    const { raw: updateSession } = await this.sessionRepository
      .createQueryBuilder()
      .update({ ...payload, updatedAt: moment() })
      .where('id=:id', { id: sessionId })
      .andWhere('userId=:userId', { userId })
      .returning('*')
      .execute();

    return updateSession;
  }

  async remove(sessionId: number, userId: string): Promise<void> {
    await this.update(sessionId, userId, { enabled: false });
  }
}
