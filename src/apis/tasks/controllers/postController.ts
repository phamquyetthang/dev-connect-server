import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequest } from '../../../common/helpers/validate';
import { ITaskStatus } from '../../../models/project/extensions/interface';
import { ITask } from '../../../models/tasks/interface';
import { ICreateStatusTaskReq, ICreateTaskReq } from '../interface';
import {
  createStatusTaskService,
  createTaskService,
} from '../services/postService';

export async function createTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskData, unitId }: ICreateTaskReq = req.body;

    const reqSchema = Joi.object<Omit<ITask, '_id' | 'unitId'>>({
      title: Joi.string().required(),
      description: Joi.string().required(),
      tags: Joi.string().required(),
      members: Joi.string().required(),
      deadline: Joi.date(),
      status: Joi.string().required(),
    });

    const data: Omit<ITask, '_id' | 'unitId'> = await validateRequest(
      reqSchema,
      taskData
    );

    const response = await createTaskService({ taskData: data, unitId });
    res.status(201).json(response);
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
