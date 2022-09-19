import { PAGINATION } from '../../../../../src/constants';
import { FilterPatientsUseCase } from '../../../../../src/modules';
import { fakePatients, fakeUsers, PatientsRepositoryMock } from '../../../../mocks';

let filterPatientsUseCase: FilterPatientsUseCase;
let patientRepositoryMock: PatientsRepositoryMock;

beforeEach(() => {
  patientRepositoryMock = new PatientsRepositoryMock();
  filterPatientsUseCase = new FilterPatientsUseCase(patientRepositoryMock);
});

describe('Testing filterPatientsUseCase', () => {
  it('must list all patients when found by name or email', async () => {
    const page = 1;
    const field = 'pac';
    const patients = await filterPatientsUseCase.execute({
      userId: fakeUsers[0].id,
      field,
      query: { page },
    });

    const total_ = fakePatients.filter(
      (patients) =>
        (patients.userId === fakeUsers[0].id &&
          patients.enabled &&
          patients.name.includes(field)) ||
        (patients.userId === fakeUsers[0].id && patients.enabled && patients.email.includes(field)),
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
    const field = 'notfound';
    return expect(
      await filterPatientsUseCase.execute({ userId: fakeUsers[3].id, field, query: { page } }),
    ).toEqual({
      response: [],
      page,
      count: 0,
      perPage: PAGINATION.PER_PAGE,
      totalPages: 0,
      hasNext: false,
      total: 0,
    });
  });
});
