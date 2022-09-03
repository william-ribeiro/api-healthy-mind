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

describe('Testing removeUserUseCase', () => {
  it('must removed user when passed a valid userId', async () => {
    await removeUserUseCase.execute(payload.id);

    expect(await usersRepositoryMock.getById(payload.id)).toBeUndefined();
  });

  it('must return error when passed invalid userId', async () => {
    try {
      return expect(await usersRepositoryMock.getById('failId')).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('User not found');
    }
  });
});
