import { ROLE_IDS } from '@/constants';
import { AppError } from '@/errors';
import { IResponseLocals } from '@/interfaces';
import { logger, timeBr } from '@/shared';
import { NextFunction, Request, Response } from 'express';

function Authorize(...roles: number[]) {
  return (request: Request, response: Response<IResponseLocals>, next: NextFunction) => {
    const { roleId, id: userId } = response.locals;

    try {
      if (!roles.length || !roles.includes(roleId)) throw new AppError('Unauthorized', 403);

      next();
    } catch (err) {
      logger.error(
        `${timeBr} | [UNAUTHORIZED] => [${request.method}]${request.baseUrl} | userLogged: ${userId}`,
      );
      throw new AppError(err.message, err.statusCode);
    }
  };
}

export const AUTH = {
  ADMIN: Authorize(ROLE_IDS.ADMIN),
  PROFESSIONAL: Authorize(ROLE_IDS.PROFESSIONAL),
  PATIENT: Authorize(ROLE_IDS.PATIENT),
  ALL: Authorize(ROLE_IDS.PROFESSIONAL, ROLE_IDS.PATIENT),
};
