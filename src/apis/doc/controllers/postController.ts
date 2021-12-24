import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequest } from '../../../common/helpers/validate';
import IDoc from '../../../models/doc/interface';
import { addMemberDocService, createDocService } from '../services/postService';

export async function createDocController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { docData, projectId }: { docData: IDoc; projectId: string } =
      req.body;

    const reqSchema = Joi.object<Omit<IDoc, '_id' | 'projectId'>>({
      title: Joi.string().required(),
      method: Joi.string().required(),
      host: Joi.string().required(),
      endpoint: Joi.string().required(),
      requestType: Joi.string().required(),
      requestBody: Joi.any(),
      responseType: Joi.string().required(),
      responseBody: Joi.any(),
      status: Joi.array().items(Joi.string()),
      description: Joi.string().required(),
      members: Joi.array().items({
        id_member: Joi.string().required(),
        name: Joi.string().required(),
      }),
    });

    const data: Omit<IDoc, '_id'> = await validateRequest(reqSchema, docData);

    const response = await createDocService(data, projectId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export async function addMemberDocControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { docId, userId } = req.body;
    const response = await addMemberDocService(docId, userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
