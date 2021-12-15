import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import {
  getListTasksControl,
} from './controllers/getController';
import { createTaskController } from './controllers/postController';
import { deleteTaskControl } from './controllers/putController';

const taskRouter = Router();
const taskPath = '/tasks';

taskRouter
  .get(taskPath, authMiddleware, getListTasksControl)
  .post(taskPath, authMiddleware, createTaskController)
  .delete(taskPath +'/:id', authMiddleware, deleteTaskControl)
  .delete(taskPath +'/status/:id', authMiddleware, deleteTaskControl)

export default taskRouter;
