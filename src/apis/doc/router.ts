import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import {
  getDocHistoryControl,
  getListDocController,
  getListDocNameController,
} from './controllers/getController';
import { createDocController } from './controllers/postController';
import { editDocController } from './controllers/putController';

const docRouter = Router();
const docPath = '/doc';

docRouter
  .get(docPath, authMiddleware, getListDocController)
  .get(docPath +'/select', authMiddleware, getListDocNameController)
  .get(docPath + '/history/:docId', authMiddleware, getDocHistoryControl)
  .post(docPath, authMiddleware, createDocController)
  .put(docPath, authMiddleware, editDocController);

export default docRouter;
