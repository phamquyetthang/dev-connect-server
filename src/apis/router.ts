import { Router } from 'express';
import authRouter from './auth/router';
import userRouter from './user/router';

const rootRouter: Router[] = [authRouter, userRouter];

export default rootRouter;
