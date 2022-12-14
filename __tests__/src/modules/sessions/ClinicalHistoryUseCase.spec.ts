import { ClinicalHistoryUseCase } from '@/modules/sessions';
import { fakeClinicalHistory, fakePatients, SessionRepositoryMock } from '../../../mocks';

let clinicalHistoryUseCase: ClinicalHistoryUseCase;
let sessionRpositoryMock: SessionRepositoryMock;

beforeEach(() => {
  sessionRpositoryMock = new SessionRepositoryMock();
  clinicalHistoryUseCase = new ClinicalHistoryUseCase(sessionRpositoryMock);
});

describe('Testing ClinicalHistoryUseCase', () => {
  it('must list all clinical history when found', async () => {
    const clinicalHistory = await clinicalHistoryUseCase.execute({
      patientId: fakePatients[0].id,
    });

    const expectedResponse = fakeClinicalHistory.find(
      (history) => history.patientId === fakePatients[0].id,
    );

    expect([expectedResponse]).toEqual(clinicalHistory);
    expect(clinicalHistory).not.toEqual([]);
  });

  it('must return empty list if clinical history not found', async () => {
    return expect(await clinicalHistoryUseCase.execute({ patientId: '00000' })).toEqual([]);
  });
});
