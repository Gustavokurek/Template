import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import SwaggerUi from 'swagger-ui-express';

import { AppError } from '@shared/errors/AppErrors';

import '../typeorm';

import 'shared/container';

import swaggerFile from '../../../swagger.json';
import { router } from './routes/index';

const app = express();
app.use(express.json());

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({
    status: 'error',
    message: `internal server error - ${err.message}`,
  });
});

app.listen(3333, () => {
  console.log('http://localhost:3333/');
});
