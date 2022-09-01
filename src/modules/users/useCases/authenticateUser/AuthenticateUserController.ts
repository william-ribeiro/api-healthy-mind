/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from '.';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    try {
      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

      const token = await authenticateUserUseCase.execute({ email, password });

      logger.info(`[USER LOGGED IN] ${email}=> | [${timeBr}]`);

      return response.json(token);
    } catch (err) {
      logger.error(`[LOGIN FAILED]=> ${email}|${err.message} | [${timeBr}]`);

      if (err.statusCode === 401) throw new AppError(err.message, err.statusCode);

      throw new AppError(err.message, err?.statusCode);
    }
  }
}
