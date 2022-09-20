import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ROLE_IDS } from './../constants/index';
import { PatientRepository } from './../modules/patients/repositories/PatientRepository';

import { AppError } from '../errors';
import { IPayload, IResponseLocals } from '../interfaces';
import { logger, timeBr } from '../shared/';
import { UsersRepository } from './../modules/users/repositories/UsersRepository';

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
  const userRepository = new UsersRepository();
  const patientRepository = new PatientRepository();

  try {
    const { sub: id, roleId } = verify(token, process.env.SECRET_ACCESS_TOKEN) as IPayload;

    const owner =
      roleId === ROLE_IDS.PROFESSIONAL
        ? await userRepository.getById(id)
        : await patientRepository.getLoginPatientById(id);

    if (!owner) throw new AppError('User does not exists!', 400);

    response.locals.id = id;
    response.locals.roleId = roleId;
    next();
  } catch (err) {
    logger.error(`${timeBr} | [INVALID TOKEN] => ${err.message}`);

    throw new AppError('Invalid token', 401);
  }
}
