import { resolve } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

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
  new winstonDaily({
    level: 'error',
    datePattern: 'YYY-MM-DD',
    dirname: resolve(__dirname, '..', '..', '..', 'logs', 'error'),
    filename: '%DATE%.log',
    maxFiles: 30,
    json: false,
    zippedArchive: true,
    format: filter('error'),
  }),

  new winstonDaily({
    level: 'info',
    datePattern: 'YYY-MM-DD',
    dirname: resolve(__dirname, '..', '..', '..', 'logs', 'info'),
    filename: '%DATE%.log',
    maxFiles: 30,
    json: false,
    zippedArchive: true,
    format: filter('info'),
  }),

  new winstonDaily({
    level: 'http',
    datePattern: 'YYY-MM-DD',
    filename: '%DATE%.log',
    dirname: resolve(__dirname, '..', '..', '..', 'logs', 'http'),
    maxFiles: 30,
    json: false,
    zippedArchive: true,
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
