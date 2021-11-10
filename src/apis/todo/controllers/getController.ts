import { NextFunction, Request, Response } from 'express';
import { getListTodoService } from '../services/getService';

export async function getListTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const searchKey = req.query.searchKey || '';
    const page = req.query.page || 0;
    const response = await getListTodoService(userId, String(searchKey), Number(page));
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
