import { NextFunction, Request, Response } from 'express';
import { getListTodoService } from '../services/getService';


export async function getListTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const response = await getListTodoService(userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

// export async function getInfoTodoController(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const TodoId = req.params.id;
//     const response = await getInfoTodoService(TodoId);
//     res.status(200).json(response);
//   } catch (error) {
//     next(error);
//   }
// }

// export async function getTodoMemberController(req: Request, res: Response, next: NextFunction){
//   const TodoId = req.params.id;
//   try {
//     const response = await getTodoMemberService(TodoId);
//     res.status(200).json(response);
//   } catch (error) {
//     next(error);
//   }
// }