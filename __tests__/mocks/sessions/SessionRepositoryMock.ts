/* eslint-disable @typescript-eslint/require-await */

import {
  ICreateSession,
  ISession,
  ISessionRepository,
  IUpdateSession,
} from '../../../src/interfaces';

import { fakeSession } from './fakeSessions';

export class SessionRepositoryMock implements ISessionRepository {
  async getSessionById(id: number, idUser: string): Promise<ISession> {
    return fakeSession.find(
      (session) => session.id === id && session.userId === idUser && session.enabled,
    );
  }

  async getAllSessions(userId: string): Promise<ISession[]> {
    return fakeSession.filter((session) => session.userId === userId && session.enabled);
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