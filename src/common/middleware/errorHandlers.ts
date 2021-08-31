import HttpException from '../helpers/HttpException';
import Logger from '../helpers/Logger';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = error.status || 500;
  const message: string = error.message || 'some error';

  Logger.error(`[ERROR]: status: ${status}, mess : ${message}`);
  res.status(status).json({
    message: message,
  });
};

export default errorMiddleware;
