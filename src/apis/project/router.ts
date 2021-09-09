import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import { createProjectController } from './controllers/postController';
import { getListProjectController } from './controllers/getController';

const projectRouter = Router();
const projectPath = '/project';

projectRouter.post(projectPath, authMiddleware, createProjectController);
projectRouter.get(projectPath, authMiddleware, getListProjectController);

export default projectRouter;
