import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors';
import { UsersRepository } from './../modules/users/repositories/UsersRepository';
import { IPayload, IResponseLocals } from '../interfaces';
import { logger, timeBr } from '../shared/';

export async function ensureAuthenticated(
  request: Request,
  response: Response<IResponseLocals>,
  next: NextFunction,
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    logger.error(`${timeBr} | [TOKEN MISSING][401] => ${Object.values(request.headers)} | `);
    throw new AppError('Token missing', 401);
  }

  const [, token] = authToken.split(' ');
  const usersRepository = new UsersRepository();

  try {
    const { sub: id } = verify(token, process.env.SECRET_ACCESS_TOKEN) as IPayload;

    const user = await usersRepository.getById(id);

    if (!user) throw new AppError('User does not exists!', 400);

    response.locals.id = id;
    next();
  } catch (err) {
    logger.error(`${timeBr} | [INVALID TOKEN] => ${err.message}`);

    throw new AppError('Invalid token', 401);
  }
}
