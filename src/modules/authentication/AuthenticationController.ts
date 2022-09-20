/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { AppError } from '../../errors';
import { logger, timeBr } from '../../shared';
import { AuthenticationUseCase } from './AuthenticationUseCase';

export class AuthenticationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const authenticationUseCase = container.resolve(AuthenticationUseCase);

      const token = await authenticationUseCase.execute({ email, password, query: request.query });

      logger.info(`${timeBr} | [USER LOGGED IN] => ${email}`);

      return response.json(token);
    } catch (err) {
      logger.error(`${timeBr} | [LOGIN FAILED]=> ${email} | ${err.message} `);

      if (err.statusCode === 401) throw new AppError(err.message, err.statusCode);

      throw new AppError(err.message, err?.statusCode);
    }
  }
}
