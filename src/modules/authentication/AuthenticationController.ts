/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { AuthenticationUseCase } from '@/modules/authentication';
import { logger, timeBr } from '@/shared';

export class AuthenticationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const authenticationUseCase = container.resolve(AuthenticationUseCase);

      const token = await authenticationUseCase.execute({ email, password, query: request.query });

      logger.info(`${timeBr} | [USER LOGGED IN] => ${email}`);

      return response.json(token);
    } catch (err) {
      logger.error(
        `${timeBr} | [LOGIN FAILED]=> Error: ${err.message} | ${email} | ${err.message} `,
      );

      if (err.statusCode === 401) throw new AppError(err.message, err.statusCode);

      if (err.message === 'Password must be changed')
        throw new AppError(err.message, err?.statusCode, err.token);

      throw new AppError(err.message, err?.statusCode);
    }
  }
}
