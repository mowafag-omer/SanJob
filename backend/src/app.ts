import "reflect-metadata"
import express from 'express';
import Server from './config/server';
import db from './config/database';
import middlewares, { errorHandler } from './middlewares';
import routes from "./config/routes"
import config from './config/constants';


const app = express();

const server = new Server(app);

server.connecte(db);
server.middlewares(middlewares);
server.routes(routes)
server.errorHandler(errorHandler)
server.start(config.PORT);