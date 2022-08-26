import winston from 'winston';
import { winstonConfig } from './config';

const { levels, transports } = winstonConfig;

export const logger = winston.createLogger({
  levels,
  transports,
  format: winston.format.json(),
});
