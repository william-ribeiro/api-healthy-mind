import { inject, injectable } from 'tsyringe';

import { CONTAINER } from '@/constants';
import { AppError } from '@/errors';
import {
  ICreateSession,
  IPatientRepository,
  IResourceRepository,
  ISession,
  ISessionRepository,
} from '@/interfaces';
import { Validators } from '@/shared';

@injectable()
export class CreateSessionUseCase {
  constructor(
    @inject(CONTAINER.SESSIONS_REPOSITORY)
    private sessionRepository: ISessionRepository,
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRepository: IPatientRepository,
    @inject(CONTAINER.RESOURCE_REPOSITORY)
    private resourceRepository: IResourceRepository,
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

    const resource = await this.resourceRepository.getResourceById({
      resourceId: payload.resourceId,
      userId,
    });

    if (!resource) throw new AppError('Resource not found', 404);

    return this.sessionRepository.create({ ...payload, userId });
  }
}
