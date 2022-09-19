/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { AuthenticatePatientUseCase } from '.';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';

export class AuthenticatePatientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    try {
      const authenticatePatientUseCase = container.resolve(AuthenticatePatientUseCase);

      const token = await authenticatePatientUseCase.execute({ email, password });

      logger.info(`${timeBr} | [PATIENT LOGGED IN] => ${email}`);

      return response.json(token);
    } catch (err) {
      logger.error(`${timeBr} | [LOGIN FAILED]=> ${email} | ${err.message} `);

      if (err.statusCode === 401) throw new AppError(err.message, err.statusCode);

      throw new AppError(err.message, err?.statusCode);
    }
  }
}
