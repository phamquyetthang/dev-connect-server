import { NextFunction, Request, Response } from 'express';
import { ICreateStatusTaskReq, ICreateTaskReq } from '../interface';
import {  createStatusTaskService, createTaskService } from '../services/postService';

export async function createTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      taskData,
      unitId,
    }: ICreateTaskReq= req.body;
    const response = await createTaskService({taskData, unitId});
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export async function createStatusTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      statusData,
      projectId,
    }: ICreateStatusTaskReq= req.body;
    const response = await createStatusTaskService({statusData, projectId});
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}
