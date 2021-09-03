import { NextFunction, Request, Response } from 'express';
import { forgotPasswordService, signInService } from '../services';

export const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const response = await signInService({ email, password });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  try {
    const response = await forgotPasswordService({ email });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
