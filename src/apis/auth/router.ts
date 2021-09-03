import { Router } from 'express';
import { forgotPasswordController, signInController } from './controllers';

const authRouter = Router();
const authPath = '/auth';
authRouter.post(authPath + '/signIn', signInController);
authRouter.post(authPath + '/forgot', forgotPasswordController);
export default authRouter;
