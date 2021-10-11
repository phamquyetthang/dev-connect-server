import { NextFunction, Request, Response } from 'express';
import IDoc from '../../../models/doc/interface';
import { createDocService } from '../services/postService';

export async function createDocController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      docData,
      projectId,
    }: { docData: IDoc; projectId: string } = req.body;
    const response = await createDocService(docData, projectId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}
