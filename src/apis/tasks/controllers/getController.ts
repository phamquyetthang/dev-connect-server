import { NextFunction, Request, Response } from 'express';
import { getListDocService } from '../../doc/services/getService';
import { getListTaskService } from '../services/getService';

export async function getListTasksControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const unitId = req.query.unitId || '';
    const response = await getListTaskService(unitId.toString());
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
    const response = await getListDocService(projectId.toString());
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

