import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import createProjectController from './controllers/createProjectController';

const projectRouter = Router();
const usePath = '/project';

projectRouter.post(usePath, authMiddleware, createProjectController);

export default projectRouter;
