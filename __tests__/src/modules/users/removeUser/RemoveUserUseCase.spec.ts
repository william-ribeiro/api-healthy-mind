import { UsersRepositoryMock, fakeUsers } from '../../../../mocks';
import { RemoveUserUseCase } from '../../../../../src/modules/users';
import { IUser } from '../../../../../src/interfaces';
import { UserCredentialsRepositoryMock } from '../../../../mocks/userCredentials';

let removeUserUseCase: RemoveUserUseCase;
let usersRepositoryMock: UsersRepositoryMock;
let userCredentialsRepositoryMock: UserCredentialsRepositoryMock;
let payload: IUser;

beforeEach(() => {
  payload = fakeUsers[0];

  usersRepositoryMock = new UsersRepositoryMock();
  userCredentialsRepositoryMock = new UserCredentialsRepositoryMock();
  removeUserUseCase = new RemoveUserUseCase(usersRepositoryMock, userCredentialsRepositoryMock);
});

describe('Testing createUserUseCase', () => {
  it('must removed user when passed a valid payload', async () => {
    await removeUserUseCase.execute(payload.id);

    const { enabled, email } = await usersRepositoryMock.getById(payload.id);

    expect(enabled).toEqual(false);
    expect(email).not.toEqual(payload.email);
  });

  it('must return error when passed invalid user', async () => {
    try {
      return expect(await usersRepositoryMock.getById('failId')).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('User not found');
    }
  });
});
