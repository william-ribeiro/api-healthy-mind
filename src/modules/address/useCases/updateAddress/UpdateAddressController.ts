import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { UpdateAddressUseCase } from './UpdateAddressUseCase';

export class UpdateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { addressId } = request.params;
    const payload = request.body;
    try {
      const addressUpdateUseCase = container.resolve(UpdateAddressUseCase);

      const updateAddress = await addressUpdateUseCase.execute(+addressId, payload);

      logger.info(`${timeBr} | [ADDRESS UPDATED] => ${JSON.stringify(payload)}`);

      return response.json(updateAddress);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [ADDRESS NOT UPDATED] => ${JSON.stringify(payload)}`);
      throw new AppError(err.message, err.statusCode);
    }
  }
}
