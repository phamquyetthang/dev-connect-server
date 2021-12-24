import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import {
  getDocDetailController,
  getDocHistoryControl,
  getDocMemberController,
  getListDocController,
  getListDocNameController,
  getListTaskInDocControl,
} from './controllers/getController';
import {
  addMemberDocControl,
  createDocController,
} from './controllers/postController';
import {
  deleteMemberDocControl,
  editDocController,
} from './controllers/putController';

const docRouter = Router();
const docPath = '/doc';

docRouter
  .get(docPath, authMiddleware, getListDocController)
  .get(docPath + '/detail/:id', authMiddleware, getDocDetailController)
  .get(docPath + '/member/:id', authMiddleware, getDocMemberController)
  .get(docPath + '/select', authMiddleware, getListDocNameController)
  .get(docPath + '/history/:docId', authMiddleware, getDocHistoryControl)
  .get(docPath + '/tasks/:docId', authMiddleware, getListTaskInDocControl)
  .post(docPath, authMiddleware, createDocController)
  .post(docPath + '/member', authMiddleware, addMemberDocControl)
  .put(docPath, authMiddleware, editDocController)
  .delete(docPath + '/member', authMiddleware, deleteMemberDocControl);

export default docRouter;
