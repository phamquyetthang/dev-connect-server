import { NextFunction, Request, Response } from 'express';
import { signInService } from '../services';

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
