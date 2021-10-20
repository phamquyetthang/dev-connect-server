import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequest } from '../../../common/helpers/validate';
import { ICreateTodoReq } from '../interface';
import { createTodoService } from '../services/postService';

export async function createTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user.id;
  const request: ICreateTodoReq = req.body;
  const reqSchema = Joi.object<ICreateTodoReq>({
    title: Joi.string().min(1).required(),
    description: Joi.string().required(),
  });
  
  try {
    const data: ICreateTodoReq = await validateRequest(reqSchema, request);
    const response = await createTodoService(data, userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
