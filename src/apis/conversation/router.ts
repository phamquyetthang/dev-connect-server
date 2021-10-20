import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import { getMyChatsControl } from './controllers/getController';

const todoRouter = Router();
const todoPath = '/conversation';

todoRouter.post(todoPath, authMiddleware, getMyChatsControl);
// todoRouter.get(todoPath, authMiddleware, getListTodoController);

export default todoRouter;
