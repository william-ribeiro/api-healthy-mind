import { fakeResources, ResourceRepositoryMock } from '../../../../mocks';
import { IResource } from '../../../../../src/interfaces';
import { RemoveResourceUseCase } from '../../../../../src/modules';

let removeResourceUseCase: RemoveResourceUseCase;
let resourceRepositoryMock: ResourceRepositoryMock;
let payload: IResource;

beforeEach(() => {
  payload = fakeResources[0];

  resourceRepositoryMock = new ResourceRepositoryMock();
  removeResourceUseCase = new RemoveResourceUseCase(resourceRepositoryMock);
});

describe('Testing removeUserUseCase', () => {
  it('must removed resource when passed a valid patientId', async () => {
    await removeResourceUseCase.execute({ resourceId: payload.id, userId: payload.userId });

    expect(
      await resourceRepositoryMock.getResourceById({
        resourceId: payload.id,
        userId: payload.userId,
      }),
    ).toBeUndefined();
  });

  it('must return error when passed invalid resourceId', async () => {
    try {
      return expect(
        await resourceRepositoryMock.getResourceById({
          resourceId: 999,
          userId: payload.userId,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Resource not found');
    }
  });
});
