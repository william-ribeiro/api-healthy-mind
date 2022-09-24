/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';
import './database';
import './shared';

import { routes } from '@/routes/index.route';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { apiDocs } from './docs/apiDocs';
import { AppError } from './errors';
import { logger } from './shared';

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs));

app.get('/', (_request: Request, response: Response) => {
  response.redirect(301, '/api-docs');
});

app.use(routes);

app.use((err: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(Number(err.statusCode)).json({
      message: err.message,
      token: err.token,
    });
  }
  return response.status(500).json({
    status: 'Error',
    message: `Internal server error ${err.message}`,
  });
});

export { app };
