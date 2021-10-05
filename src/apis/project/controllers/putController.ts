import { NextFunction, Request, Response } from "express";
import { addMemberService } from "../services/putService";

export async function addMemberController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {email, projectId} = req.body;
      const response = await addMemberService(email, projectId);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  