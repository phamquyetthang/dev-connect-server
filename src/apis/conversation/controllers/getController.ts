import { NextFunction, Request, Response } from 'express';
import { getMyChatsService, getOneChatsService } from '../services/getService';


export async function getMyChatsControl (
  req: Request,
  res: Response,
  next: NextFunction
){
  try {
    const result = await getMyChatsService(
      req.user.id
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export async function getOneChatsControl(
  req: Request,
  res: Response,
  next: NextFunction
){
  try {
    const useIdTo: string = req.params.id;
    const result = await getOneChatsService(
      req.user.id,
      useIdTo
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};