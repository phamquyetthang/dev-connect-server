import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import { getListDocController } from './controllers/getController';
import { createDocController } from './controllers/postController';

const docRouter = Router();
const docPath = '/doc';

docRouter.get(docPath, authMiddleware, getListDocController);
docRouter.post(docPath, authMiddleware, createDocController);

export default docRouter;
