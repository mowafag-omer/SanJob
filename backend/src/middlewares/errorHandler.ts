import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  
  const status = err.status || 500;
  const msg =
    status == 500
      ? { message: "Sonething went wrong !" }
      : { message: err.message };
  res.status(status).json(msg);
};

export default errorHandler;