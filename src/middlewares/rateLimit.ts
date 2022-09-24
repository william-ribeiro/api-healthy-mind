import rateLimit from 'express-rate-limit';

import { RATE_LIMIT } from '@/constants';
import { AppError } from '@/errors';

export const limit = rateLimit({
  max: RATE_LIMIT.MAX,
  windowMs: RATE_LIMIT.WINDOWS_MS,
  handler: function () {
    throw new AppError('You sent too many requests. Please wait a while then try again', 429);
  },
});
