import { UpdateRoleUseCase } from '../../../../../src/modules';
import { fakeRoles, RolesRepositoryMock } from '../../../../mocks/';

let updateRoleUseCase: UpdateRoleUseCase;
let roleRepositoryMock: RolesRepositoryMock;
let payload: any;

beforeEach(() => {
  payload = fakeRoles[3];

  roleRepositoryMock = new RolesRepositoryMock();
  updateRoleUseCase = new UpdateRoleUseCase(roleRepositoryMock);
});

describe('Testing updateRoleUseCase', () => {
  it('must return updated role when a passed valid payload', async () => {
    payload.name = 'Update role';

    const updateRole = await updateRoleUseCase.execute(payload.id, payload);

    const expectResponse = await roleRepositoryMock.getRoleById(updateRole.id);

    expect(updateRole).toEqual(expectResponse);
  });

  it('must return update role error when payload empty', async () => {
    try {
      return expect(await updateRoleUseCase.execute(payload.id, {})).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid payload');
    }
  });

  it('must return update role error when payload invalid payload', async () => {
    try {
      return expect(await updateRoleUseCase.execute(payload.id, { name: '' })).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid name');
    }
  });

  it('must return update role error when passed invalid roleId', async () => {
    try {
      return expect(
        await updateRoleUseCase.execute(999, {
          ...payload,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Role not found');
    }
  });

  it('must return update role error when passed roleId disabled', async () => {
    const roleDisabled = fakeRoles[4];
    try {
      return expect(
        await updateRoleUseCase.execute(roleDisabled.id, {
          ...roleDisabled,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Role not found');
    }
  });

  it('must return update role error when passed roleId protected', async () => {
    const roleDisabled = fakeRoles[0];
    try {
      return expect(
        await updateRoleUseCase.execute(roleDisabled.id, {
          ...roleDisabled,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Role is protected');
    }
  });
});
