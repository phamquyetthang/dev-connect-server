import { Router } from 'express';
import authRouter from './auth/router';
import projectRouter from './project/router';
import userRouter from './user/router';

const rootRouter: Router[] = [authRouter, userRouter, projectRouter];

export default rootRouter;
