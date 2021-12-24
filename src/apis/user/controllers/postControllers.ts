import { NextFunction, Request, Response } from 'express';
import { IAddSnippetReq } from '../interfaces';
import { addSnippetService } from '../services/postService';

export const addSnippetController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const model: IAddSnippetReq = req.body;

  try {
    const response = await addSnippetService(model);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
