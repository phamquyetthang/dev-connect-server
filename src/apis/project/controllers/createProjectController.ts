import { NextFunction, Request, Response } from 'express';
import IInfoProject from '../../../models/project/information/interface';
import createProjectService from '../services/createProjectService';

export default async function createProjectController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const request: IInfoProject = req.body;
    const userId = req.user.id;
    const response = createProjectService(request, userId)
    res.status(201).json(response);
  } catch (error) {
      next(error)
  }
}
