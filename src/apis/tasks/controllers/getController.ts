import { NextFunction, Request, Response } from 'express';
import { getListStatusTaskService, getListTaskService } from '../services/getService';

export async function getListTasksControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projectId = req.query.projectId || '';
    const page = req.query.page || 0;
    const searchKey = req.query.searchKey || '';
    const response = await getListTaskService(
      projectId.toString(),
      Number(page),
      String(searchKey),
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function getListStatusTasksControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projectId = req.query.projectId || '';
    const response = await getListStatusTaskService(projectId.toString());
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
