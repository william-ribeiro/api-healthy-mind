import { CONTAINER } from './../../../../constants/index';
import { inject, injectable } from 'tsyringe';
import {
  ICreateSession,
  IPatientRepository,
  ISession,
  ISessionRepository,
} from '../../../../interfaces';
import { AppError } from '../../../../errors';
import { Validators } from '../../../../shared';

@injectable()
export class CreateSessionUseCase {
  constructor(
    @inject(CONTAINER.SESSIONS_REPOSITORY)
    private sessionRepository: ISessionRepository,
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRepository: IPatientRepository,
  ) {}

  async execute(userId: string, payload: ICreateSession): Promise<ISession> {
    if (typeof 'object' && !Object.values(payload).length) throw new AppError('Invalid payload');

    try {
      await new Validators().session.validate(payload, { abortEarly: true });
    } catch (err) {
      throw new AppError(err.errors[0]);
    }

    const patient = await this.patientRepository.getPatientById(payload.patientId, userId);

    if (!patient) throw new AppError('Patient not found', 404);

    return this.sessionRepository.create({ ...payload, userId });
  }
}