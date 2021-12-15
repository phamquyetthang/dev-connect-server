import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import {
  createProjectController,
  createStatusTaskController,
  createTagTaskControl,
} from './controllers/postController';
import {
  getInfoProjectController,
  getListProjectController,
  getListStatusTasksControl,
  getProjectMemberController,
  getTagTasksControl,
} from './controllers/getController';
import {
  addMemberController,
  deleteMemberController,
  editProjectController,
} from './controllers/putController';

const projectRouter = Router();
const projectPath = '/project';

projectRouter
  .post(projectPath, authMiddleware, createProjectController)
  .post(projectPath + '/tag', authMiddleware, createTagTaskControl)
  .post(projectPath + '/status', authMiddleware, createStatusTaskController);

projectRouter
  .get(projectPath, authMiddleware, getListProjectController)
  .get(projectPath + '/tag/:id', authMiddleware, getTagTasksControl)
  .get(projectPath + '/status/:id', authMiddleware, getListStatusTasksControl)
  .get(projectPath + '/:id', authMiddleware, getInfoProjectController)
  .get(
    `${projectPath}/members/:id`,
    authMiddleware,
    getProjectMemberController
  );

projectRouter
  .put(projectPath + '/addMember', authMiddleware, addMemberController)
  .put(projectPath + '/:id', authMiddleware, editProjectController);

projectRouter.delete(
  projectPath + '/member',
  authMiddleware,
  deleteMemberController
);

export default projectRouter;
