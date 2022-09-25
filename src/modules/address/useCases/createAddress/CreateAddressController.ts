import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { CreateAddressUseCase } from '@/modules/address';
import { logger, timeBr } from '@/shared';
export class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const payload = request.body;

    try {
      const createAddressUseCase = container.resolve(CreateAddressUseCase);

      const createAddress = await createAddressUseCase.execute(payload);

      logger.info(`${timeBr} | [ADDRESS CREATED] => ${JSON.stringify(payload)}`);

      return response.status(201).json(createAddress);
    } catch (err) {
      logger.error(
        `${timeBr} | [ADDRESS NOT CREATED => Error: ${err.message} | ${JSON.stringify(payload)}]`,
      );

      throw new AppError(err.message, err.statusCode);
    }
  }
}
