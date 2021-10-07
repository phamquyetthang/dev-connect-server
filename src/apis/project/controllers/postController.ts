import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequest } from '../../../common/helpers/validate';
import { ICreateProjectReq } from '../interface';
import { createProjectService } from '../services/postService';

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
