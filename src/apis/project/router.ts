import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import { createProjectController } from './controllers/postController';
import {
  getInfoProjectController,
  getListProjectController,
} from './controllers/getController';

const projectRouter = Router();
const projectPath = '/project';

projectRouter.post(projectPath, authMiddleware, createProjectController);
projectRouter.get(projectPath, authMiddleware, getListProjectController);
projectRouter.get(
  projectPath + '/:id',
  authMiddleware,
  getInfoProjectController
);

export default projectRouter;
