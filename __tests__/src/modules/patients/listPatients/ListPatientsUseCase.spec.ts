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
    const patients = await listPatientsUseCase.execute(fakeUsers[0].id);

    const expectedPatients = fakePatients.filter((fake) => fake.enabled);
    expect(expectedPatients).toEqual(patients);
  });

  it('must return empty list if patients not found', async () => {
    return expect(await listPatientsUseCase.execute(fakeUsers[3].id)).toEqual([]);
  });
});
