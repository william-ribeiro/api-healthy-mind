import morgan from 'morgan';
import { logger } from '../shared';

export const morganMiddleware = morgan('combined', {
  skip: (req, res) => res.statusCode < 400,
  stream: {
    write: (msg) => logger.http(msg),
  },
});
