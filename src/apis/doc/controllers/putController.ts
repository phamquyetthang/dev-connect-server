import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequest } from '../../../common/helpers/validate';
import { IDocSchema } from '../../../models/doc/interface';
import { deleteMemberDocService, editDocService } from '../services/putService';
export async function editDocController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const { docId, data } = req.body;
    const reqSchema = Joi.object<Omit<IDocSchema, 'projectId' | 'members'>>({
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
    });
    const dataValid: Omit<IDocSchema, 'projectId' | 'members'> =
      await validateRequest(reqSchema, data);
      
    const response = await editDocService({ userId, docId, data: dataValid });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function deleteMemberDocControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { docId, userId } = req.body;
    const response = await deleteMemberDocService(docId, userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}