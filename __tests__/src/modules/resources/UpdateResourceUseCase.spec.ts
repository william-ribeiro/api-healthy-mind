import { IResource } from '@/interfaces';
import { UpdateResourceUseCase } from '@/modules/';
import { fakeResources, ResourceRepositoryMock } from '../../../mocks';

let updateResourceUseCase: UpdateResourceUseCase;
let resourceRepositoryMock: ResourceRepositoryMock;
let payload: IResource;

beforeEach(() => {
  payload = fakeResources[0];

  resourceRepositoryMock = new ResourceRepositoryMock();
  updateResourceUseCase = new UpdateResourceUseCase(resourceRepositoryMock);
});

describe('Testing updateResourceUseCase', () => {
  it('must return updated resource when a passed valid payload', async () => {
    payload.title = 'Update Resource Testing';

    const updateResource = await updateResourceUseCase.execute({
      resourceId: payload.id,
      userId: payload.userId,
      payload,
    });

    const expectResponse = await resourceRepositoryMock.getResourceById({
      resourceId: updateResource.id,
      userId: updateResource.userId,
    });

    expect(updateResource).toEqual(expectResponse);
  });

  it('must return update resource error when payload empty', async () => {
    try {
      return expect(
        await updateResourceUseCase.execute({
          resourceId: payload.id,
          userId: payload.userId,
          payload: {},
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid payload');
    }
  });

  it('must return update resource error when passed invalid payload ', async () => {
    try {
      return expect(
        await updateResourceUseCase.execute({
          resourceId: payload.id,
          userId: payload.userId,
          payload: {
            title: '',
          },
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid title');
    }
  });

  it('must return update resource error when title already exists', async () => {
    try {
      return expect(
        await updateResourceUseCase.execute({
          resourceId: fakeResources[1].id,
          userId: payload.userId,
          payload: {
            title: fakeResources[0].title,
          },
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Resource already exists');
    }
  });

  it('must return update resource error title already exists considering case', async () => {
    try {
      return expect(
        await updateResourceUseCase.execute({
          resourceId: fakeResources[1].id,
          userId: payload.userId,
          payload: {
            title: fakeResources[0].title,
          },
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Resource already exists');
    }
  });

  it('must return update resource error when invalid resourceId', async () => {
    try {
      return expect(
        await updateResourceUseCase.execute({
          resourceId: 999,
          userId: payload.userId,
          payload: {
            description: 'update description testing',
          },
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Resource not found');
    }
  });

  it('must return update resource error when passed resourceId disabled', async () => {
    const resourceDisabled = fakeResources[3];
    try {
      return expect(
        await updateResourceUseCase.execute({
          resourceId: resourceDisabled.id,
          userId: resourceDisabled.userId,
          payload: {
            description: 'update description testing',
          },
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Resource not found');
    }
  });
});
