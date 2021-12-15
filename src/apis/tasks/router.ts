import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import {
  getListTasksControl,
} from './controllers/getController';
import { deleteTaskControl } from './controllers/putController';

const taskRouter = Router();
const taskPath = '/tasks';

taskRouter
  .get(taskPath, authMiddleware, getListTasksControl)

  .delete(taskPath +'/:id', authMiddleware, deleteTaskControl)
  .delete(taskPath +'/status/:id', authMiddleware, deleteTaskControl)

export default taskRouter;
