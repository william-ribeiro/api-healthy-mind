import moment from 'moment';
import { getRepository, Raw, Repository } from 'typeorm';
import { DATABASE, PAGINATION, SELECT_FIELDS } from '../../../constants';
import {
  IClinicalHistory,
  ICreateSession,
  ISession,
  ISessionRepository,
  IUpdateSession,
} from '../../../interfaces';
import { Session } from '../entities';
import { ClinicalHistory } from '../views';

export class SessionRepository implements ISessionRepository {
  private sessionRepository: Repository<ISession>;
  private viewClinicalHistory: Repository<IClinicalHistory>;

  constructor() {
    this.sessionRepository = getRepository(Session);
    this.viewClinicalHistory = getRepository(ClinicalHistory);
  }

  async getSessionById(sessionId: number, userId: string): Promise<ISession> {
    return this.sessionRepository.findOne({ id: sessionId, userId, enabled: true });
  }

  async filterSessions(field: string, skip: number, where: any): Promise<[ISession[], number]> {
    return this.sessionRepository
      .createQueryBuilder(DATABASE.SESSIONS)
      .leftJoinAndSelect(DATABASE.JOIN.SESSION_RESOURCE, DATABASE.ALIAS.SESSION)
      .select([
        DATABASE.SESSIONS,
        SELECT_FIELDS.SESSION.CATEGORY,
        SELECT_FIELDS.SESSION.TITLE,
        SELECT_FIELDS.SESSION.DESCRIPTION,
      ])

      .where({
        subject: Raw((alias) => `${alias} ILIKE '%${field.trim()}%'`),
        ...where,
      })
      .orWhere({
        service: Raw((alias) => `${alias} ILIKE '%${field.trim()}%'`),
        ...where,
      })

      .skip(skip)
      .take(PAGINATION.PER_PAGE)
      .getManyAndCount();
  }

  async getClinicalHistoryByPatientId(patientId: string): Promise<IClinicalHistory[]> {
    return this.viewClinicalHistory.find({
      where: { patientId },
    });
  }

  async getAllSessions(skip: number, where: any): Promise<[ISession[], number]> {
    return this.sessionRepository
      .createQueryBuilder(DATABASE.SESSIONS)
      .leftJoinAndSelect(DATABASE.JOIN.SESSION_RESOURCE, DATABASE.ALIAS.SESSION)
      .select([
        DATABASE.SESSIONS,
        SELECT_FIELDS.SESSION.CATEGORY,
        SELECT_FIELDS.SESSION.TITLE,
        SELECT_FIELDS.SESSION.DESCRIPTION,
      ])

      .where(where)
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
