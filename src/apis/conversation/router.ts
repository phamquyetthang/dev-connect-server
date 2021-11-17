import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import {
  getChatContentControl,
  getMyChatsControl,
} from './controllers/getController';
import {
  createChatroomControl,
  sendMessageToGroupControl,
} from './controllers/postController';

const chatRouter = Router();
const chatPath = '/chat';

chatRouter.get(chatPath, authMiddleware, getMyChatsControl);
chatRouter.post(chatPath + '/group', authMiddleware, createChatroomControl);
chatRouter.get(chatPath + '/:id', authMiddleware, getChatContentControl);
// chatRouter.get(chatPath + '/toUser/:id', authMiddleware, getOneChatsControl);
// chatRouter.post(chatPath + '/toUser', authMiddleware, sendMessageUserControl);
chatRouter.post(chatPath, authMiddleware, sendMessageToGroupControl);

export default chatRouter;
