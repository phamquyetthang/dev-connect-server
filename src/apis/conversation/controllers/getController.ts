import { NextFunction, Request, Response } from 'express';
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
    const result = await getMyChatsService(req.user.id);
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
