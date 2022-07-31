import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "./logger";
import errorHandler from "./errorHandler";

// create a Morgan middleware instance
const morganMiddleware = morgan("combined", {
  // specify a function for skipping requests without errors
  skip: (_req, res) => res.statusCode < 400,
  // specify a stream for requests logging
  stream: {
    write: (msg) => logger.error(msg),
  },
});

const middlewares = {
  json: express.json(),
  urlencoded: express.urlencoded({ extended: false }),
  cookie: cookieParser(),
  // cors: cors(),
  cors: cors({origin:'http://localhost:3000', credentials:true, exposedHeaders: 'Authorization'}),
  apiLogger: morganMiddleware,
};

export { errorHandler }
export default middlewares;
