import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import {
  getListStatusTasksControl,
  getListTasksControl,
} from './controllers/getController';
import { deleteTaskControl } from './controllers/putController';

const taskRouter = Router();
const docPath = '/tasks';

taskRouter
  .get(docPath, authMiddleware, getListTasksControl)
  .get(docPath + '/status', authMiddleware, getListStatusTasksControl)
  .delete(docPath +'/:id', authMiddleware, deleteTaskControl)
  .delete(docPath +'/status/:id', authMiddleware, deleteTaskControl)

export default taskRouter;
