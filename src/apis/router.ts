import { Router } from 'express';
import authRouter from './auth/router';
import chatRouter from './conversation/router';
import docRouter from './doc/router';
import projectRouter from './project/router';
import todoRouter from './todo/router';
import userRouter from './user/router';

const rootRouter: Router[] = [
  authRouter,
  userRouter,
  projectRouter,
  docRouter,
  todoRouter,
  chatRouter,
];

export default rootRouter;
