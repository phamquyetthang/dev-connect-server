import { NextFunction, Request, Response } from 'express';
import { getInfoService } from '../services/getServices';

export const getInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  try {
    const response = await getInfoService(userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
