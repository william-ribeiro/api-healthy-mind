import moment from 'moment';
import { getRepository, Repository } from 'typeorm';
import { DATABASE, PAGINATION, SELECT_FIELDS } from '../../../constants';
import { ICreateSession, ISession, ISessionRepository, IUpdateSession } from '../../../interfaces';
import { Session } from '../entities';

export class SessionRepository implements ISessionRepository {
  private sessionRepository: Repository<ISession>;

  constructor() {
    this.sessionRepository = getRepository(Session);
  }

  async getSessionById(sessionId: number, userId: string): Promise<ISession> {
    return this.sessionRepository.findOne({ id: sessionId, userId, enabled: true });
  }

  async getAllSessions(userId: string, skip: number): Promise<[ISession[], number]> {
    return this.sessionRepository
      .createQueryBuilder(DATABASE.SESSIONS)
      .leftJoinAndSelect(DATABASE.JOIN.SESSION_RESOURCE, DATABASE.ALIAS.SESSION)
      .select([
        DATABASE.SESSIONS,
        SELECT_FIELDS.SESSION.CATEGORY,
        SELECT_FIELDS.SESSION.TITLE,
        SELECT_FIELDS.SESSION.DESCRIPTION,
      ])

      .where('sessions.userId = :userId', { userId })
      .andWhere('sessions.enabled = :enabled', { enabled: true })

      .skip(skip)
      .take(PAGINATION.PER_PAGE)
      .getManyAndCount();
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
