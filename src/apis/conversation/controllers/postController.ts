import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ISendMessageReq } from '../interface';
import { sendMessageService } from '../services/postService';

export async function sendMessageControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const model: ISendMessageReq = req.body;
    const result = await sendMessageService(req.user.id, model);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
