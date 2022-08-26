import winston from 'winston';
import { resolve } from 'path';

const filter = (level: string) =>
  winston.format((info) => {
    if (info.level === level) {
      return info;
    }
  })();

const levels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  http: 5,
};

const transports = [
  new winston.transports.File({
    filename: resolve(__dirname, '..', '..','..', 'logs', 'error.log'),
    level: 'error',
    format: winston.format.simple(),
  }),

  new winston.transports.File({
    filename: resolve(__dirname, '..', '..', '..','logs', 'combined.log'),
    level: 'info',
    format: winston.format.simple(),
  }),

  new winston.transports.File({
    filename: resolve(__dirname, '..', '..', '..','logs', 'http.log'),
    level: 'http',
    format: filter('http'),
  }),

  new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      filter('debug'),
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  }),

  new winston.transports.Console({
    level: 'error',
    format: winston.format.combine(
      filter('error'),
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  }),

  new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(
      filter('info'),
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  }),
];

export const winstonConfig = {
  levels,
  transports,
  format: winston.format.json(),
};
