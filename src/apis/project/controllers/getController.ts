import { NextFunction, Request, Response } from 'express';
import { getListProjectService } from '../services/getService';

export async function getListProjectController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const response = await getListProjectService(userId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}
