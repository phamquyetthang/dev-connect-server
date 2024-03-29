import { NextFunction, Request, Response } from 'express';
import {
  getDocDetailService,
  getDocHistoryService,
  getDocMemberService,
  getListDocNameService,
  getListDocService,
  getListTaskInDocService,
} from '../services/getService';

export async function getListDocController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projectId = req.query.projectId || '';
    const page = req.query.page || 0;
    const searchKey = req.query.searchKey || '';
    const response = await getListDocService(
      String(projectId),
      String(searchKey),
      Number(page)
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function getDocDetailController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const docId = req.params.id;
    const response = await getDocDetailService(docId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function getDocMemberController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const docId = req.params.id;
    const response = await getDocMemberService(docId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function getListDocNameController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projectId = req.query.projectId || '';
    const response = await getListDocNameService(String(projectId));
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function getDocHistoryControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const docId = req.params.docId;
    const response = await getDocHistoryService(docId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function getListTaskInDocControl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const docId = req.params.docId;
    const response = await getListTaskInDocService(docId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
