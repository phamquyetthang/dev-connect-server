import { Router } from 'express';
import { signInController } from './controllers';

const authRouter = Router();
const authPath = '/auth';
authRouter.post(authPath + '/signIn', signInController);

export default authRouter;
