import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequest } from '../../../common/helpers/validate';
import { IChangeIndexReq, IUpdateTodoReq } from '../interface';
import { changeIndexService, updateTodoService } from '../services/putService';

export async function updateTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const request: IUpdateTodoReq = req.body;
  const reqSchema = Joi.object<IUpdateTodoReq>({
    id: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    deadline: Joi.date(),
    status: Joi.boolean(),
  });
  try {
    const data: IUpdateTodoReq = await validateRequest(reqSchema, request);
    const response = await updateTodoService(data);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function changeIndexControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const request: IChangeIndexReq = req.body;
  const reqSchema = Joi.object<IChangeIndexReq>({
    id: Joi.string().required(),
    newNumber: Joi.number().required(),
  });
  try {
    const data: IChangeIndexReq = await validateRequest(reqSchema, request);
    const response = await changeIndexService(data);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
