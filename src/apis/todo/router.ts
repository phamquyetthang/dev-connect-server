import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import { getListTodoController } from './controllers/getController';
import { createTodoController } from './controllers/postController';
import {
  changeIndexControl,
  updateTodoController,
} from './controllers/putController';

const todoRouter = Router();
const todoPath = '/todo';

todoRouter.post(todoPath, authMiddleware, createTodoController);
todoRouter.get(todoPath, authMiddleware, getListTodoController);
todoRouter.put(todoPath, authMiddleware, updateTodoController);
todoRouter.put(todoPath + '/index', authMiddleware, changeIndexControl);

export default todoRouter;
