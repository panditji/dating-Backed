/**
 * third party libraries
 */
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import http from 'http';
import cors from 'cors';
import { errors } from 'celebrate';
import morgan from 'morgan';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { I18n } from 'i18n';

import path from 'path';

dotenv.config()
// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;

/**
 * server configuration
 */
import config from '../config';
import { privateRouter, publicRouter } from './routes';
import dbConfig from "../config/db";
import swaggerService from './services/swagger.service';
import auth from './policies/auth.policy';
import { logger } from '../api/utils';


/**
 * express application
 */
const app = express();
const server = new http.Server(app);

// i18n configuration
const i18n = new I18n()
i18n.configure({
  locales: ['de', 'en', 'fr'],
  directory: path.join(__dirname, '../locales'),
  defaultLocale: 'en',
  register: global,
  queryParameter: 'lang'
});
app.use(i18n.init)

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

const { swaggerUi, specs: swaggerSpecs } = swaggerService();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// parsing the request bodys
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// secure your private routes with jwt authentication middleware
app.all('/v1/private/*', (req, res, next) => auth(req, res, next));

// fill routes for express application
app.use('/v1/public', publicRouter);
app.use('/v1/private', privateRouter);

app.use(errors());

app.use((req: Request, res: Response) => {
  logger.error(`404 - ${req.method} | ${req.path} : Not Found`);
  res.status(404).json({ status: 404, msg: `${req.method} | ${req.path} : Not Found` });
});

// eslint-disable-next-line no-unused-vars
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  interface IerrObj {
    status: string,
    details: any
  };
  const errObj: IerrObj = {
    status: 'failure',
    details: err
  }
  // errObj.message = err.errors[0].message ? err.errors[0].message : 'Somethong went wrong';
  // errObj.details = err.errors ? err.errors : {};
  res.status(500).json(errObj);
});


const DbEnvConfig = dbConfig(environment)
const ormConfig = {
  "type": DbEnvConfig.type,
  "host": DbEnvConfig.host,
  "port": DbEnvConfig.port,
  "username": DbEnvConfig.username,
  "password": DbEnvConfig.password,
  "database": DbEnvConfig.database,
  "synchronize": true,
  "logging": DbEnvConfig.logging,
  "logger": DbEnvConfig.logger,
  "entities": [`${DbEnvConfig.project_folder}/entity/**/*{.js,.ts}`],
  "columnHint": "camelCase",
}

createConnection(ormConfig).then(async connection => {
  console.error(`Env - ${environment}`);
  console.error(`Database Connected`);
  server.listen(config.port, () => {
    if (environment !== 'production'
      && environment !== 'development'
      && environment !== 'staging'
      && environment !== 'test'
    ) {
      console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
      process.exit(1);
    }
    return connection;
  });
}).catch(error => console.log(error));
