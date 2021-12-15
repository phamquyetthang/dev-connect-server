import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequest } from '../../../common/helpers/validate';
import { ITaskStatus } from '../../../models/project/extensions/interface';
import { ICreateProjectReq, ICreateStatusTaskReq } from '../interface';
import {
  createProjectService,
  createStatusTaskService,
  createTagTaskService,
} from '../services/postService';

export async function createProjectController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user.id;
  const request: ICreateProjectReq = req.body;
  const reqSchema = Joi.object({
    name: Joi.string().min(1).required(),
    description: Joi.string().required(),
    readme: Joi.string().required(),
  });

  try {
    const data: ICreateProjectReq = await validateRequest(reqSchema, request);
    const response = await createProjectService(data, userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function createTagTaskControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId, title } = req.body;
    const response = await createTagTaskService(projectId, title);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function createStatusTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { statusData, projectId }: ICreateStatusTaskReq = req.body;

    const reqSchema = Joi.object<Omit<ITaskStatus, '_id' | 'projectId'>>({
      name: Joi.string().required(),
      description: Joi.string(),
      color: Joi.string(),
    });

    const data: Omit<ITaskStatus, '_id' | 'projectId'> = await validateRequest(
      reqSchema,
      statusData
    );

    const response = await createStatusTaskService({
      statusData: data,
      projectId,
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}
