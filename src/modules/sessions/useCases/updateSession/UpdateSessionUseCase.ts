import moment from 'moment';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors';
import {
  IPatientRepository,
  IResourceRepository,
  ISession,
  ISessionRepository,
  IUpdateSession,
} from '../../../../interfaces';
import { filterDefinedProperties, payloadValidate } from '../../../../utils';
import { CONTAINER } from './../../../../constants';

@injectable()
export class UpdateSessionUseCase {
  constructor(
    @inject(CONTAINER.SESSIONS_REPOSITORY)
    private sessionRepository: ISessionRepository,
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRepository: IPatientRepository,
    @inject(CONTAINER.RESOURCE_REPOSITORY)
    private resourceRepository: IResourceRepository,
  ) {}

  async execute(sessionId: number, userId: string, payload: IUpdateSession): Promise<ISession> {
    payloadValidate(payload);

    const session = await this.sessionRepository.getSessionById(sessionId, userId);

    if (!session) throw new AppError('Session not found', 404);

    const patientId = payload.patientId || session.patientId;
    const patient = await this.patientRepository.getPatientById(patientId, userId);

    if (!patient) throw new AppError('Patient not found', 404);

    if (payload.resourceId) {
      const resource = await this.resourceRepository.getResourceById({
        resourceId: payload.resourceId,
        userId,
      });

      if (!resource) throw new AppError('Resource not found', 404);
    }

    if (
      (payload.appointmentDate &&
        moment(payload.appointmentDate).isBefore(moment(patient.createdAt))) ||
      moment(payload.appointmentDate).isBefore(moment(session.createdAt))
    )
      throw new AppError('Invalid date', 400);

    return this.sessionRepository.update(sessionId, userId, {
      ...filterDefinedProperties(payload),
    });
  }
}
