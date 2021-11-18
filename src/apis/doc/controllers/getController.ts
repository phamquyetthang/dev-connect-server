import { NextFunction, Request, Response } from 'express';
import { getListDocService } from '../services/getService';

export async function getListDocController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projectId = req.query.projectId || '';
    const page = req.query.page || 0;
    const searchKey = req.query.searchKey || '';
    const response = await getListDocService(
      String(projectId),
      String(searchKey),
      Number(page)
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
