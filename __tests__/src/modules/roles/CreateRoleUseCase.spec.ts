import { CreateRoleUseCase } from '@/modules/roles';
import { fakeRoles, RolesRepositoryMock } from '../../../mocks/roles';

let createRoleUseCase: CreateRoleUseCase;
let roleRepositoryMock: RolesRepositoryMock;
let payload: any;

beforeEach(() => {
  payload = {
    name: 'new role test',
  };

  roleRepositoryMock = new RolesRepositoryMock();
  createRoleUseCase = new CreateRoleUseCase(roleRepositoryMock);
});

describe('Testing createRoleUseCase', () => {
  it('must return created role when passed a valid payload', async () => {
    const role = await createRoleUseCase.execute({ ...payload });

    const expectResponse = await roleRepositoryMock.getRoleById(role.id);

    expect(role).toEqual(expectResponse);
  });

  it('must return create role error when passed payload empty', async () => {
    try {
      return expect(await createRoleUseCase.execute({} as any)).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid payload');
    }
  });

  it('must return create role error when passed invalid payload', async () => {
    payload.name = '';

    try {
      return expect(await createRoleUseCase.execute({ ...payload })).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid name');
    }
  });

  it('must return create role error when role already exists', async () => {
    payload.name = fakeRoles[0].name;
    try {
      return expect(await createRoleUseCase.execute({ ...payload })).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Role already exists');
    }
  });
});
