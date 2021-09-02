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
    console.log("🚀 ~ file: register.ts ~ line 13 ~ response", response)
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
