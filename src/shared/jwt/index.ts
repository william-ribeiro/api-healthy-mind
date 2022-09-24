import { decode } from 'jsonwebtoken';

import { UsersRepository } from '@/modules/';

export const decodeToken = async (token: string) => {
  const userRepository = new UsersRepository();

  const { sub: id } = decode(token);

  return userRepository
    .getById(id.toString())
    .then((result) => result)
    .catch(() => false);
};
