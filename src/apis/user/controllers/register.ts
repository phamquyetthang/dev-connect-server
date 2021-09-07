import { NextFunction, Request, Response } from 'express';
import IUser from '../../../models/user/account/interface';
import registerService from '../services/register';

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const model: IUser = req.body;
  try {
    const response = await registerService(model);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
