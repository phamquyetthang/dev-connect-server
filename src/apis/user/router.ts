import { Router } from 'express';
import { registerController } from './controllers/register';

const userRouter = Router();
const usePath = '/user';

userRouter.post(usePath + '/register', registerController);

export default userRouter;
