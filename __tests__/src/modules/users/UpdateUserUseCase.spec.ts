import { IUser } from '@/interfaces';
import { UpdateUserUseCase } from '@/modules/users';
import { fakeUsers, UsersRepositoryMock } from '../../../mocks';

let updateUserUseCase: UpdateUserUseCase;
let usersRepositoryMock: UsersRepositoryMock;
let payload: IUser;

beforeEach(() => {
  payload = fakeUsers[0];

  usersRepositoryMock = new UsersRepositoryMock();
  updateUserUseCase = new UpdateUserUseCase(usersRepositoryMock);
});

describe('Testing updateUserUseCase', () => {
  it('must return updated user when a passed valid payload', async () => {
    payload.name = 'Update User';
    delete payload.password;

    const updateUser = await updateUserUseCase.execute(payload.id, payload);

    const expectResponse = await usersRepositoryMock.getById(updateUser.id);

    expect(updateUser).toEqual(expectResponse);
  });

  it('must return update user error when payload empty', async () => {
    try {
      return expect(await updateUserUseCase.execute(payload.id, {})).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid payload');
    }
  });

  it('must return update user error when password mismatch', async () => {
    try {
      return expect(
        await updateUserUseCase.execute(fakeUsers[1].id, {
          password: '12345678',
          newPassword: '1234567',
          confirmPassword: '12345678',
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Password mismatch');
    }
  });

  it('must return user update error when password less than 6 characters', async () => {
    try {
      return expect(
        await updateUserUseCase.execute(fakeUsers[2].id, {
          password: '12345678',
          newPassword: '123',
          confirmPassword: '123',
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Minimum 6 characters');
    }
  });

  it('must return update user error when passed invalid email ', async () => {
    try {
      return expect(
        await updateUserUseCase.execute(payload.id, {
          email: 'invalid',
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid email');
    }
  });

  it('must return update user error when email in use', async () => {
    try {
      return expect(
        await updateUserUseCase.execute(payload.id, {
          email: fakeUsers[1].email,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Email in use');
    }
  });
});
