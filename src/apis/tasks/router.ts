import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import {
  getListStatusTasksControl,
  getListTasksControl,
} from './controllers/getController';
import { deleteTaskControl } from './controllers/putController';

const taskRouter = Router();
const taskPath = '/tasks';

taskRouter
  .get(taskPath, authMiddleware, getListTasksControl)
  .get(taskPath + '/status', authMiddleware, getListStatusTasksControl)
  .delete(taskPath +'/:id', authMiddleware, deleteTaskControl)
  .delete(taskPath +'/status/:id', authMiddleware, deleteTaskControl)

export default taskRouter;
