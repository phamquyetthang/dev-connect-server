import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequest } from '../../../common/helpers/validate';
import { IEditSnippetReq } from '../interfaces';
import { editSnippetService } from '../services/putServices';

export async function editSnippetControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const request: IEditSnippetReq = req.body;
    const reqSchema = Joi.object<IEditSnippetReq>({
      userId: Joi.string().required(),
      snippetId: Joi.string().required(),
    });
    const data: IEditSnippetReq = await validateRequest(reqSchema, request);
    const result = await editSnippetService(data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
