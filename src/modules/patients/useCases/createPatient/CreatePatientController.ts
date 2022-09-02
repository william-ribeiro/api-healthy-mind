import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { CreatePatientUseCase } from './CreatePatientUseCase';

export class CreatePatientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;
    const payload = request.body;

    try {
      const createPatientUseCase = container.resolve(CreatePatientUseCase);

      const patient = await createPatientUseCase.execute({ ...payload, userId });

      logger.info(`${timeBr} | [CREATED PATIENT] => ${JSON.stringify(patient)}`);

      return response.status(201).json(patient);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [PATIENT NOT CREATED] => ${JSON.stringify(payload)}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
