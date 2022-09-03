import { CONTAINER } from './../../../../constants/index';
import { inject, injectable } from 'tsyringe';
import { IPatientRepository } from '../../../../interfaces';
import { AppError } from '../../../../errors';
import moment from 'moment';

@injectable()
export class RemovePatientUseCase {
  constructor(
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRepository: IPatientRepository,
  ) {}

  async execute(patientId: string, userId: string): Promise<void> {
    const patient = await this.patientRepository.getPatientById(patientId, userId);

    if (!patient) throw new AppError('Patient not found', 404);

    const timestamp = moment().unix();

    const payload = {
      email: `${timestamp}_${patient.email}`,
      document: `${timestamp}_${patient.document}`,
    };

    await this.patientRepository.remove(patientId, userId, { ...payload });
  }
}
