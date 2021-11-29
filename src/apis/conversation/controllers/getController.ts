import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequest } from '../../../common/helpers/validate';
import {
  getChatContentService,
  getChatFromDocService,
  getMyChatsService,
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
    const page = req.query.page || 0;
    const result = await getChatContentService(id, Number(page));
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getChatFromDocControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const docId: string = req.params.docId;
    const newChat = await getChatFromDocService(req.user.id, docId);
    const listChat = await getMyChatsService(req.user.id, newChat.projectId);

    const response = {
      listChat,
      newChat: {
        id: newChat._id,
        name: newChat.name,
        messages: newChat.messages,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
