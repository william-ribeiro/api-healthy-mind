import { inject, injectable } from 'tsyringe';

import { CONTAINER } from '@/constants';
import { AppError } from '@/errors';
import { IPatient, IPatientRepository } from '@/interfaces';

@injectable()
export class PatientInfoUseCase {
  constructor(
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRespository: IPatientRepository,
  ) {}

  async execute({ userId, patientId }): Promise<IPatient> {
    const patient = await this.patientRespository.getPatientById(patientId, userId);
    if (!patient) throw new AppError('Patient not found');
    delete patient.password;

    return patient;
  }
}
