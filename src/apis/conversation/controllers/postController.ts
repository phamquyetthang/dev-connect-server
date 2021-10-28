import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequest } from '../../../common/helpers/validate';
import { ICreateChatroomReq, ISendMessageUserReq } from '../interface';
import {
  createChatroomService,
  sendMessageToGroupService,
} from '../services/postService';

export async function createChatroomControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const request: ICreateChatroomReq = req.body;
    const reqSchema = Joi.object<ICreateChatroomReq>({
      projectId: Joi.string().required(),
      member: Joi.string(),
      all: Joi.boolean(),
      name: Joi.string(),
    });
    const data: ICreateChatroomReq = await validateRequest(reqSchema, request);
    const result = await createChatroomService(req.user.id, data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function sendMessageToGroupControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const model: ISendMessageUserReq = req.body;
    console.log("🚀 ~ file: postController.ts ~ line 38 ~ model", model)
    const reqSchema = Joi.object<ISendMessageUserReq>({
      conversationId: Joi.string().required(),
      text: Joi.string().required(),
    });
    const data: ISendMessageUserReq = await validateRequest(reqSchema, model);
    const result = await sendMessageToGroupService(req.user.id, data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
