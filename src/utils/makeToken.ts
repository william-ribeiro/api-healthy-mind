import { sign } from 'jsonwebtoken';
import { JWT } from '../constants';

export const makeToken = (id: string) => {
  return sign({}, process.env.SECRET, {
    subject: id,
    expiresIn: JWT.EXPIRE_IN,
  });
};
