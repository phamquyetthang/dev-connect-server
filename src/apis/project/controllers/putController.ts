import { NextFunction, Request, Response } from 'express';
import { IEditProjectReq } from '../interface';
import {
  addMemberService,
  deleteMemberService,
  editProjectService,
} from '../services/putService';

export async function addMemberController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, projectId } = req.body;
    const response = await addMemberService(email, projectId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}
export async function editProjectController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projectId: string = req.params.id;
    const request = req.body;
    const response = await editProjectService({ projectId, ...request });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export async function deleteMemberController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId, memberId } = req.body;
    const response = await deleteMemberService(projectId, memberId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}
