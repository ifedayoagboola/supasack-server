import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import { errorMiddleware } from './apis/middleware';
import { logger } from './utilities';
import { v1Router } from '@src/apis/routes';
import variables from './variables';

const app = express();

app.use(cors());

//set express view engine
app.set('view engine', 'ejs');

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) =>
  res.json({
    status: 'success',
    message: 'Ecommerce server response',
    data: null
  })
);

app.use(variables.app.baseRouter, v1Router);

app.use(errorMiddleware);

app.use((req, res, _next) =>
  res.status(404).json({
    status: 'error',
    message: 'resource not found',
    path: req.url
  })
);

app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.log(err);
  logger.error(`[UNEXPECTED ERROR] => ${err.message}`);

  return res.status(err.status || 500).send({
    status: 'error',
    message: 'Internal server error'
  });
});

export default app;
