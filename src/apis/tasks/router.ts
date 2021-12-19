import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import {
  getListTasksControl,
  getTaskDetailControl,
  getTaskHistoryControl,
} from './controllers/getController';
import { createTaskController } from './controllers/postController';
import {
  deleteTaskControl,
  editTaskControl,
} from './controllers/putController';

const taskRouter = Router();
const taskPath = '/tasks';

taskRouter
  .get(taskPath, authMiddleware, getListTasksControl)
  .get(taskPath + '/:id', authMiddleware, getTaskDetailControl)
  .get(taskPath + '/history/:id', authMiddleware, getTaskHistoryControl)
  .post(taskPath, authMiddleware, createTaskController)
  .put(taskPath, authMiddleware, editTaskControl)
  .delete(taskPath + '/:id', authMiddleware, deleteTaskControl);

export default taskRouter;
