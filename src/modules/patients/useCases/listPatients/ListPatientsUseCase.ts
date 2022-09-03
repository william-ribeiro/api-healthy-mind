import { IPatientRepository } from './../../../../interfaces/repositories/IPatientRepository';
import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '../../../../constants';
import { IPatient } from '../../../../interfaces';

@injectable()
export class ListPatientsUseCase {
  constructor(
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRepository: IPatientRepository,
  ) {}

  async execute(userId: string): Promise<IPatient[]> {
    return this.patientRepository.listAllPatients(userId);
  }
}
