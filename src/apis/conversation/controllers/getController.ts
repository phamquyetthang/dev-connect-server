import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequest } from '../../../common/helpers/validate';
import {
  getChatContentService,
  getMyChatsService,
  getOneChatsService,
} from '../services/getService';

export async function getMyChatsControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projectId = req.query.projectId || '';

    const reqSchema = Joi.object({
      projectId: Joi.string().required(),
    });
    const { projectId: project_id } = await validateRequest(reqSchema, {
      projectId,
    });
    const result = await getMyChatsService(req.user.id, project_id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
export async function getChatContentControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id: string = req.params.id;
    const result = await getChatContentService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getOneChatsControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const useIdTo: string = req.params.to;
    const result = await getOneChatsService(req.user.id, useIdTo);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
