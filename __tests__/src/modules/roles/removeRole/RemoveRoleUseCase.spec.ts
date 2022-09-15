import { RemoveRoleUseCase } from '../../../../../src/modules';
import { fakeRoles, RolesRepositoryMock } from '../../../../mocks/';

let removeRoleUseCase: RemoveRoleUseCase;
let roleRepositoryMock: RolesRepositoryMock;
let payload: any;

beforeEach(() => {
  payload = fakeRoles[3];
  roleRepositoryMock = new RolesRepositoryMock();
  removeRoleUseCase = new RemoveRoleUseCase(roleRepositoryMock);
});

describe('Testing removeRoleUseCase', () => {
  it('must removed role when passed a valid roleId', async () => {
    await removeRoleUseCase.execute(payload.id);

    expect(await roleRepositoryMock.getRoleById(payload.id)).toBeUndefined();
  });

  it('must return error when passed invalid roleId', async () => {
    try {
      return expect(await removeRoleUseCase.execute(999)).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Role not found');
    }
  });

  it('must return error when passed roleId protected', async () => {
    try {
      return expect(await removeRoleUseCase.execute(fakeRoles[1].id)).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Role is protected');
    }
  });
});
