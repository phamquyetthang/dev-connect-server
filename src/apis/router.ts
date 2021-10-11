import { Router } from 'express';
import authRouter from './auth/router';
import docRouter from './doc/router';
import projectRouter from './project/router';
import userRouter from './user/router';

const rootRouter: Router[] = [authRouter, userRouter, projectRouter, docRouter];

export default rootRouter;
