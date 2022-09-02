import { UsersRepositoryMock } from '../../../../mocks';
import { CreateUserUseCase } from '../../../../../src/modules/users';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryMock: UsersRepositoryMock;
let payload: any;

beforeEach(() => {
  payload = {
    name: 'testing',
    email: 'testing1@email.com',
    password: 'testing',
    confirmPassword: 'testing',
  };

  usersRepositoryMock = new UsersRepositoryMock();
  createUserUseCase = new CreateUserUseCase(usersRepositoryMock);
});

describe('Testing createUserUseCase', () => {
  it('must return created user when passed a valid payload', async () => {
    const createUser = await createUserUseCase.execute({
      ...payload,
    });

    const expectResponse = await usersRepositoryMock.getById(createUser.id);

    expect(createUser).toEqual(expectResponse);
  });

  it('must return error when passed invalid payload', async () => {
    payload.name = '';

    try {
      return expect(
        await createUserUseCase.execute({
          ...payload,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid name');
    }
  });

  it('must return error when password mismatch', async () => {
    payload.email = 'testing2@email.com';
    payload.confirmPassword = 'fail';

    try {
      return expect(
        await createUserUseCase.execute({
          ...payload,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Password mismatch');
    }
  });

  it('must return user update error when password less than 6 characters', async () => {
    payload.password = '123';
    payload.confirmPassword = '123';
    try {
      return expect(
        await createUserUseCase.execute({
          ...payload,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Minimum 6 characters');
    }
  });

  it('must return error when user already exists', async () => {
    try {
      return expect(
        await createUserUseCase.execute({
          ...payload,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('User already exists');
    }
  });
});
