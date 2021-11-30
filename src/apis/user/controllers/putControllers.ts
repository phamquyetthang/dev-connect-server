import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateRequest } from '../../../common/helpers/validate';
import {
  IChangePasswordReq,
  IEditSnippetReq,
  IEditUserBasicReq,
  IEditUserProfileReq,
} from '../interfaces';
import {
  changeLanguageService,
  changeThemeService,
  editPasswordService,
  editSnippetService,
  editUserBasicInfoService,
  editUserProfileService,
} from '../services/putServices';

export async function editUserBasicInfoControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const request: IEditUserBasicReq = req.body;
    const reqSchema = Joi.object<IEditUserBasicReq>({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required().email(),
    });
    const data: IEditUserBasicReq = await validateRequest(reqSchema, request);
    const result = await editUserBasicInfoService(userId, data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function editUserProfileControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const request = req.body;
    const reqSchema = Joi.object<IEditUserProfileReq>({
      company: Joi.string(),
      website: Joi.string(),
      location: Joi.string(),
      status: Joi.string(),
      skills: Joi.array().items(Joi.string()),
      bio: Joi.string(),
    });
    const data: IEditUserProfileReq = await validateRequest(reqSchema, request);
    const result = await editUserProfileService(userId, data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function changePasswordControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const request: IChangePasswordReq = req.body;
    const reqSchema = Joi.object<IChangePasswordReq>({
      oldPassWord: Joi.string().required(),
      newPassWord: Joi.string().required(),
    });
    const data: IChangePasswordReq = await validateRequest(reqSchema, request);
    const result = await editPasswordService(userId, data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function changeThemeControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const { theme }: { theme: string } = req.body;
    const newTheme: string = await validateRequest(
      Joi.string().required(),
      theme
    );
    const result = await changeThemeService(userId, newTheme);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function changeLanguageControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const { language }: { language: string } = req.body;
    const newLanguage: string = await validateRequest(
      Joi.string().required(),
      language
    );
    const result = await changeLanguageService(userId, newLanguage);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

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
