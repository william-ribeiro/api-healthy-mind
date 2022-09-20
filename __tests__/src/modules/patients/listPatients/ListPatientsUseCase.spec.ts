import { PAGINATION } from '../../../../../src/constants';
import { ListPatientsUseCase } from '../../../../../src/modules';
import { fakePatients, fakeUsers, PatientsRepositoryMock } from '../../../../mocks';

let listPatientsUseCase: ListPatientsUseCase;
let patientRepositoryMock: PatientsRepositoryMock;

beforeEach(() => {
  patientRepositoryMock = new PatientsRepositoryMock();
  listPatientsUseCase = new ListPatientsUseCase(patientRepositoryMock);
});

describe('Testing listPatientsUseCase', () => {
  it('must list all patients when found', async () => {
    const page = 1;
    const patients = await listPatientsUseCase.execute({
      userId: fakeUsers[0].id,
      query: { page },
    });

    const total_ = fakePatients.filter(
      (patients) => patients.userId === fakeUsers[0].id && patients.enabled,
    );

    const totalPages = Math.ceil(total_.length / PAGINATION.PER_PAGE);

    const expectedPatients = {
      response: total_.slice(page - 1, PAGINATION.PER_PAGE),
      page: patients.page,
      count: patients.response.length,
      perPage: PAGINATION.PER_PAGE,
      total: total_.length,
      totalPages,
      hasNext: page !== totalPages && page < totalPages,
    };
    expect(expectedPatients).toEqual(patients);
    expect(patients.response).not.toEqual([]);
  });

  it('must return empty list if patients not found', async () => {
    const page = 1;

    return expect(
      await listPatientsUseCase.execute({ userId: fakeUsers[3].id, query: { page } }),
    ).toEqual({
      response: [{} as any],
      page,
      count: 0,
      perPage: PAGINATION.PER_PAGE,
      totalPages: 0,
      hasNext: false,
      total: 0,
    });
  });
});
