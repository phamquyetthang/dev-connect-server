import { NextFunction, Request, Response } from 'express';
import { ICreateDocReq } from '../interface';
import { createDocService } from '../services/postService';

export async function createDocController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const request: ICreateDocReq = req.body;
    const userId = req.user.id;
    const response = await createDocService(request, userId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}
