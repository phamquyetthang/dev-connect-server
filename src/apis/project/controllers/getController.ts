import { NextFunction, Request, Response } from 'express';
import {
  getInfoProjectService,
  getListProjectService,
  getProjectMemberService,
} from '../services/getService';

export async function getListProjectController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const response = await getListProjectService(userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function getInfoProjectController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projectId = req.params.id;
    const response = await getInfoProjectService(projectId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function getProjectMemberController(req: Request, res: Response, next: NextFunction){
  const projectId = req.params.id;
  try {
    const response = await getProjectMemberService(projectId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}