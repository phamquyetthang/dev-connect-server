import { NextFunction, Request, Response } from 'express';
import {
  getListDocService,
} from '../services/getService';

export async function getListDocController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const response = await getListDocService(userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

