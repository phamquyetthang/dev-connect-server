import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import { createDocController } from './controllers/postController';

const docRouter = Router();
const docPath = '/doc';

docRouter.post(docPath, authMiddleware, createDocController);


export default docRouter;
