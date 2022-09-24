import { inject, injectable } from 'tsyringe';

import { CONTAINER } from '@/constants';
import { IClinicalHistory, ISessionRepository } from '@/interfaces';

@injectable()
export class ClinicalHistoryUseCase {
  constructor(
    @inject(CONTAINER.SESSIONS_REPOSITORY)
    private sessionRepository: ISessionRepository,
  ) {}

  async execute({ patientId }): Promise<IClinicalHistory[]> {
    const clinicalHistory = await this.sessionRepository.getClinicalHistoryByPatientId(patientId);

    return clinicalHistory;
  }
}
