import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import {
  getInfoController,
  getPreferencesControl,
} from './controllers/getControllers';
import { registerController } from './controllers/register';

const userRouter = Router();
const usePath = '/user';

userRouter.post(usePath + '/register', registerController);
userRouter.get(usePath + '/info', authMiddleware, getInfoController);
userRouter.get(usePath + '/preferences', authMiddleware, getPreferencesControl);
userRouter.put(usePath + '/snippet', authMiddleware, getPreferencesControl);

export default userRouter;
