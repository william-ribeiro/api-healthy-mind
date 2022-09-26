import { ROLE_IDS } from '@/constants';
import { AppError } from '@/errors';
import { IResponseLocals } from '@/interfaces';
import { NextFunction, Request, Response } from 'express';

function Authorize(...roles: number[]) {
  return (request: Request, response: Response<IResponseLocals>, next: NextFunction) => {
    const { roleId } = response.locals;

    if (!roles.length || !roles.includes(roleId)) throw new AppError('Unauthorized', 403);

    next();
  };
}

export const AUTH = {
  ADMIN: Authorize(ROLE_IDS.ADMIN),
  PROFESSIONAL: Authorize(ROLE_IDS.PROFESSIONAL),
  PATIENT: Authorize(ROLE_IDS.PATIENT),
  ALL: Authorize(ROLE_IDS.PROFESSIONAL, ROLE_IDS.PATIENT),
};
