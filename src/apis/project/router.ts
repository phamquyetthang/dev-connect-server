import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import { createProjectController } from './controllers/postController';
import {
  getInfoProjectController,
  getListProjectController,
  getProjectMemberController,
} from './controllers/getController';
import { addMemberController } from './controllers/putController';

const projectRouter = Router();
const projectPath = '/project';

projectRouter.post(projectPath, authMiddleware, createProjectController);

projectRouter.get(projectPath, authMiddleware, getListProjectController);

projectRouter.get(
  projectPath + '/:id',
  authMiddleware,
  getInfoProjectController
);

projectRouter.get(
  `${projectPath}/members/:id`,
  authMiddleware,
  getProjectMemberController
);

projectRouter.put(
  projectPath + '/addMember',
  authMiddleware,
  addMemberController
);

export default projectRouter;
