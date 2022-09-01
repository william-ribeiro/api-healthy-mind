import { sign } from 'jsonwebtoken';
import { IToken } from './../interfaces';
import { JWT } from '../constants';

export const generateToken = ({ id, type }: IToken) => {
  let secret: string;
  let expiresIn: string;

  switch (type) {
    case JWT.TYPE.ACCESS_TOKEN:
      secret = process.env.SECRET_ACCESS_TOKEN;
      expiresIn = JWT.EXPIRES_IN_AT;

      break;

    case JWT.TYPE.REFRESH_TOKEN:
      secret = process.env.SECRET_REFRESH_TOKEN;
      expiresIn = JWT.EXPIRES_IN_RT;

      break;

    default:
      break;
  }

  return sign({}, secret, {
    subject: id,
    expiresIn,
    header: { alg: JWT.ALG, typ: type },
  });
};
