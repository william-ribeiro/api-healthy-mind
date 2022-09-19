/* eslint-disable @typescript-eslint/require-await */

import { PAGINATION } from '../../../src/constants';
import {
  ICreateSession,
  ISession,
  ISessionRepository,
  IUpdateSession,
} from '../../../src/interfaces';
import { buildClusters } from '../../../src/utils';

import { fakeSession } from './fakeSessions';

export class SessionRepositoryMock implements ISessionRepository {
  async getSessionById(id: number, idUser: string): Promise<ISession> {
    return fakeSession.find(
      (session) => session.id === id && session.userId === idUser && session.enabled,
    );
  }

  async filterSessions(userId: string, field: string, skip: number): Promise<[ISession[], number]> {
    const sessions = fakeSession.filter(
      (session) =>
        (session.userId === userId && session.enabled && session.subject.includes(field)) ||
        (session.userId === userId && session.enabled && session.service.includes(field)),
    );

    const total = sessions.length;

    const paginateSessions = !sessions.length
      ? []
      : buildClusters(sessions.slice(skip), PAGINATION.PER_PAGE)[0];

    return [paginateSessions, total];
  }

  async getAllSessions(userId: string, skip: number): Promise<[ISession[], number]> {
    const sessions = fakeSession.filter((session) => session.userId === userId && session.enabled);

    const total = sessions.length;
    const paginateSessions = !sessions.length
      ? []
      : buildClusters(sessions.splice(skip), PAGINATION.PER_PAGE)[0];

    return [paginateSessions, total];
  }

  async create(payload: ICreateSession): Promise<ISession> {
    const id = fakeSession.length + 1;

    const index = fakeSession.push({
      id,
      ...payload,
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return fakeSession[index - 1];
  }

  async update(idSession: number, idUser: string, payload: IUpdateSession): Promise<ISession> {
    const index = fakeSession.findIndex(
      (session) => session.id === idSession && session.userId === idUser,
    );

    return (fakeSession[index] = {
      ...fakeSession[index],
      ...payload,
    });
  }

  async remove(idSession: number, idUser: string): Promise<void> {
    await this.update(idSession, idUser, { enabled: false });
  }
}
