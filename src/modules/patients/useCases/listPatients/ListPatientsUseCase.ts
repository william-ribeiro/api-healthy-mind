import { inject, injectable } from 'tsyringe';
import { CONTAINER, PAGINATION } from '../../../../constants';
import { IPatient, IPaginate, IPatientRepository } from '../../../../interfaces';
import { parsePage } from '../../../../utils';

@injectable()
export class ListPatientsUseCase {
  constructor(
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRepository: IPatientRepository,
  ) {}

  async execute({ userId, query }): Promise<IPaginate<IPatient[]>> {
    const { page = PAGINATION.PAGE } = query;

    const [response, total] = await this.patientRepository.getAllPatients(
      userId,
      (parsePage(page) - 1) * PAGINATION.PER_PAGE,
    );

    const totalPages = Math.ceil(total / PAGINATION.PER_PAGE);

    return {
      response,
      page,
      count: response.length,
      perPage: PAGINATION.PER_PAGE,
      totalPages,
      hasNext: page !== totalPages && page < totalPages,
      total,
    };
  }
}
