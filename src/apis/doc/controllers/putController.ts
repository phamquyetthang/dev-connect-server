import { NextFunction, Request, Response } from 'express';
import { editDocService } from '../services/putService';
export async function editDocController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const { docId, data } = req.body;
    const response = await editDocService({ userId, docId, data });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
