import { inject, injectable } from 'tsyringe';

import { CONTAINER, PAGINATION } from '@/constants';
import { IPaginate, IPatient, IPatientRepository } from '@/interfaces';
import { parsePage } from '@/utils';

@injectable()
export class FilterPatientsUseCase {
  constructor(
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRespository: IPatientRepository,
  ) {}

  async execute({ userId, field = '', query }): Promise<IPaginate<IPatient[]>> {
    const { page = PAGINATION.PAGE } = query;

    const [response, total] = await this.patientRespository.filterPatients(
      userId,
      field,
      (parsePage(page) - 1) * PAGINATION.PER_PAGE,
    );

    const totalPages = Math.ceil(total / PAGINATION.PER_PAGE);

    const patients = response.map((patient) => {
      delete patient.password;
      return { ...patient };
    });

    return {
      response: patients,
      page,
      count: response.length,
      perPage: PAGINATION.PER_PAGE,
      totalPages,
      hasNext: page !== totalPages && page < totalPages,
      total,
    };
  }
}
