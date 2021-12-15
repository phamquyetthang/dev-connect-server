import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequest } from '../../../common/helpers/validate';
import { ITask } from '../../../models/tasks/interface';
import { ICreateTaskReq } from '../interface';
import { createTaskService } from '../services/postService';

export async function createTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskData, unitId }: ICreateTaskReq = req.body;
    console.log("🚀 ~ file: postController.ts ~ line 15 ~ req.body", req.body)

    const reqSchema = Joi.object<Omit<ITask, '_id' | 'unitId'>>({
      title: Joi.string().required(),
      description: Joi.string().required(),
      tags: Joi.array().items(Joi.string()),
      assignee: Joi.string().required(),
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
