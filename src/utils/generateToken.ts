import { sign } from 'jsonwebtoken';

import { JWT } from '@/constants';
import { IToken } from '@/interfaces';

export const generateToken = ({ id, type, roleId }: IToken) => {
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

  return sign({ roleId }, secret, {
    subject: id,

    expiresIn,
    header: { alg: JWT.ALG, typ: type },
  });
};
