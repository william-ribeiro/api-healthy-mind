import { IUser } from '../../../../../src/interfaces';
import { RemoveUserUseCase } from '../../../../../src/modules/users';
import { fakeUsers, UsersRepositoryMock } from '../../../../mocks';
import { CredentialsRepositoryMock } from '../../../../mocks/credentials';

let removeUserUseCase: RemoveUserUseCase;
let usersRepositoryMock: UsersRepositoryMock;
let credentialsRepositoryMock: CredentialsRepositoryMock;
let payload: IUser;

beforeEach(() => {
  payload = fakeUsers[0];

  usersRepositoryMock = new UsersRepositoryMock();
  credentialsRepositoryMock = new CredentialsRepositoryMock();
  removeUserUseCase = new RemoveUserUseCase(usersRepositoryMock, credentialsRepositoryMock);
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
