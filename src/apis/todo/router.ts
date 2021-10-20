import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import { getListTodoController } from './controllers/getController';
import { createTodoController } from './controllers/postController';

const todoRouter = Router();
const todoPath = '/todo';

todoRouter.post(todoPath, authMiddleware, createTodoController);
todoRouter.get(todoPath, authMiddleware, getListTodoController);

export default todoRouter;
