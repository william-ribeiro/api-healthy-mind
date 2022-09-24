import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { RemoveAddressUseCase } from '@/modules/address';
import { logger, timeBr } from '@/shared';

export class RemoveAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { addressId } = request.params;
    try {
      const removeAddresUseCase = container.resolve(RemoveAddressUseCase);

      await removeAddresUseCase.execute(+addressId);

      logger.info(`${timeBr} | [ADDRESS REMOVED] => {"addresId":"${addressId}"`);

      return response.status(204).send();
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [ADDRESS NOT REMOVED] => {"addressId":"${addressId}"}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
