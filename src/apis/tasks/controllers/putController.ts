import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequest } from '../../../common/helpers/validate';
import { IEditTaskReq, IEditTaskStatusReq } from '../interface';
import {
  deleteStatusTaskService,
  deleteTaskService,
  editTaskService,
} from '../services/putService';

export async function editTaskControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const request: IEditTaskReq = req.body;
    const reqSchema = Joi.object<IEditTaskReq>({
      id: Joi.string().required(),
      title: Joi.string(),
      description: Joi.string(),
      tags: Joi.array().items(Joi.string()),
      members: Joi.array().items(Joi.string()),
      deadline: Joi.string(),
      status: Joi.string(),
    });
    const data: IEditTaskReq = await validateRequest(reqSchema, request);
    const response = await editTaskService(data);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function editTaskStatusControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const request: IEditTaskStatusReq = req.body;
    
    const reqSchema = Joi.object<IEditTaskStatusReq>({
      id: Joi.string().required(),
      name: Joi.string(),
      description: Joi.string(),
      color: Joi.string(),
    });

    const data: IEditTaskStatusReq = await validateRequest(reqSchema, request);
    const response = await editTaskService(data);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function deleteTaskControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const response = await deleteTaskService(id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function deleteStatusTaskControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const response = await deleteStatusTaskService(id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
