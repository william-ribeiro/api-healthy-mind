/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';
import './database';
import './shared';

import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

import { logger, } from './shared';
import { AppError } from './errors';
import router from './routes';

const app = express();
app.use(express.json());
app.use(helmet());

const morganMiddleware = morgan('combined', {
  stream: {
    write: (msg) => logger.http(msg),
  },
});



app.use(morganMiddleware);

app.use(
  cors({
    origin: '*',
  }),
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(Number(err.statusCode)).json({
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'Error',
    message: `Internal server error ${err.message}`,
  });
});

export { app };
