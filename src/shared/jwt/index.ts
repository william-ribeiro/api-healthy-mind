import { decode } from 'jsonwebtoken';
import { UsersRepository } from './../../modules/users/repositories/UsersRepository';
export const decodeToken = async (token: string) => {
  const userRepository = new UsersRepository();

  const { sub: id } = decode(token);

  return userRepository
    .getById(id.toString())
    .then((result) => result)
    .catch(() => false);
};
