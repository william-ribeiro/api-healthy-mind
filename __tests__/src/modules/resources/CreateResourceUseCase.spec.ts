import { CreateResourceUseCase } from '@/modules';
import { fakeResources, fakeUsers, ResourceRepositoryMock } from '../../../mocks';

let createResourceUseCase: CreateResourceUseCase;
let resourceRepositoryMock: ResourceRepositoryMock;
let payload: any;

beforeEach(() => {
  payload = {
    userId: fakeUsers[0].id,
    category: 'Category testing',
    title: 'Title testing',
    description: 'Description testing',
  };

  resourceRepositoryMock = new ResourceRepositoryMock();
  createResourceUseCase = new CreateResourceUseCase(resourceRepositoryMock);
});

describe('Testing createResourceUseCase', () => {
  it('must return created resource when passed a valid payload', async () => {
    const resource = await createResourceUseCase.execute({
      payload,
    });

    const expectResponse = await resourceRepositoryMock.getResourceById({
      resourceId: resource.id,
      userId: resource.userId,
    });

    expect(resource).toEqual(expectResponse);
  });

  it('must return create resource error when passed empty payload', async () => {
    try {
      return expect(
        await createResourceUseCase.execute({
          payload: { userId: payload.userId } as any,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid payload');
    }
  });

  it('must return create resource error when passed invalid payload', async () => {
    payload.title = '';

    try {
      return expect(await createResourceUseCase.execute({ payload })).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid title');
    }
  });

  it('must return create resource error when title already exists', async () => {
    payload = fakeResources[0];
    try {
      return expect(await createResourceUseCase.execute({ payload })).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Resource already exists');
    }
  });

  it('must return resource creation error when title already exists considering case', async () => {
    try {
      payload.title = fakeResources[0].title.toLowerCase();
      return expect(await createResourceUseCase.execute({ payload })).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Resource already exists');
    }
  });
});
