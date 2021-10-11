import { NextFunction, Request, Response } from 'express';
import { getListDocService } from '../services/getService';

export async function getListDocController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projectId = req.query.projectId || '';
    const response = await getListDocService(projectId.toString());
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
