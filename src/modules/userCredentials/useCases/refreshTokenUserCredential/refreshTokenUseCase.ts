import { decode, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { CONTAINER, JWT } from '../../../../constants';
import { IPayload, IRefreshToken, IUserCredentialsRepository } from '../../../../interfaces';
import { logger, timeBr } from '../../../../shared';
import { AppError } from '../../../../errors';
import { generateToken } from '../../../../utils';

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject(CONTAINER.USER_CREDENTIALS_REPOSITORY)
    private userCredentialsRepository: IUserCredentialsRepository,
  ) {}

  async execute(refreshToken: string): Promise<IRefreshToken> {
    try {
      if (!refreshToken) throw new AppError('Invalid refreshToken');
      const { sub: userId } = verify(refreshToken, process.env.SECRET_REFRESH_TOKEN) as IPayload;

      const credential = await this.userCredentialsRepository.getCredentialByUserId(userId);

      if (!credential) throw new AppError('Login again');

      const accessToken = generateToken({ id: userId, type: JWT.TYPE.ACCESS_TOKEN });

      const newAccessToken = await this.userCredentialsRepository.update(userId, {
        accessToken,
      });
      return newAccessToken[0].accessToken;
    } catch (err: Error | any) {
      if (err.message === JWT.EXPIRED) {
        const { sub: userId } = decode(refreshToken);

        await this.userCredentialsRepository.update(userId.toString(), { isValid: false });
      }

      logger.error(`${timeBr} | [INVALID REFRESH TOKEN] =>`);
      throw new AppError(err.message, 401);
    }
  }
}
