import { NextFunction, Request, Response } from 'express';

import { IResponseLocals } from '@/interfaces';

export function getIp(request: Request, response: Response<IResponseLocals>, next: NextFunction) {
  const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;

  try {
    response.locals.ip = ip;
    console.log(ip);
    next();
  } catch (err) {
    return;
  }
}
