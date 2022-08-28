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
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    logger.error(`${timeBr} | [TOKEN MISSING][401] => ${Object.values(request.headers)} | `);
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, process.env.SECRET) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.getById(userId);

    if (!user) throw new AppError('User does not exists!', 400);

    response.locals.id = userId;
    next();
  } catch (err) {
    logger.error(`${timeBr} | [INVALID TOKEN] => ${err.message}`);

    throw new AppError('Invalid token', 401);
  }
}
