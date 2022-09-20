import { inject, injectable } from 'tsyringe';
import { CONTAINER, PAGINATION } from '../../../../constants';
import { IPaginate, IPatient, IPatientRepository } from '../../../../interfaces';
import { deletedPasswordResponse, parsePage } from '../../../../utils';

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

    const patients = deletedPasswordResponse(response);

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
