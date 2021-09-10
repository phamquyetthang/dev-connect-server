import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import { getInfoController } from './controllers/getControllers';
import { registerController } from './controllers/register';

const userRouter = Router();
const usePath = '/user';

userRouter.post(usePath + '/register', registerController);
userRouter.get(usePath + '/info', authMiddleware, getInfoController);

export default userRouter;
