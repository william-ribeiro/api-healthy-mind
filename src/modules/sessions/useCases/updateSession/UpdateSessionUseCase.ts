import { inject, injectable } from 'tsyringe';
import {
  IPatientRepository,
  ISession,
  ISessionRepository,
  IUpdateSession,
} from '../../../../interfaces';
import { CONTAINER } from './../../../../constants';
import { AppError } from '../../../../errors';
import { filterDefinedProperties } from '../../../../utils';

@injectable()
export class UpdateSessionUseCase {
  constructor(
    @inject(CONTAINER.SESSIONS_REPOSITORY)
    private sessionRepository: ISessionRepository,
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRepository: IPatientRepository,
  ) {}

  async execute(sessionId: number, userId: string, payload: IUpdateSession): Promise<ISession> {
    if (typeof 'object' && !Object.values(payload).length) throw new AppError('Invalid payload');

    const session = await this.sessionRepository.getSessionById(sessionId, userId);

    if (!session) throw new AppError('Session not found', 404);

    const patient = await this.patientRepository.getPatientById(payload.patientId, userId);

    if (!patient) throw new AppError('Patient not found', 404);

    return this.sessionRepository.update(sessionId, userId, {
      ...filterDefinedProperties(payload),
    });
  }
}
