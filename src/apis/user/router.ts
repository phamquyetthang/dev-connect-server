import { Router } from 'express';
import authMiddleware from '../../common/middleware/authentication';
import {
  getInfoController,
  getPreferencesControl,
  getUserProfileControl,
} from './controllers/getControllers';
import { addSnippetController } from './controllers/postControllers';
import {
  changeLanguageControl,
  changePasswordControl,
  changeThemeControl,
  editUserBasicInfoControl,
  editUserProfileControl,
} from './controllers/putControllers';
import { registerController } from './controllers/register';

const userRouter = Router();
const usePath = '/user';

userRouter
  .post(usePath + '/register', registerController)
  .post(usePath + '/snippet', addSnippetController)

  .get(usePath + '/info', authMiddleware, getInfoController)
  .get(usePath + '/profile', authMiddleware, getUserProfileControl)
  .get(usePath + '/preferences', authMiddleware, getPreferencesControl)

  .put(usePath + '/profile', authMiddleware, editUserProfileControl)
  .put(usePath + '/basic', authMiddleware, editUserBasicInfoControl)
  .put(usePath + '/password', authMiddleware, changePasswordControl)
  .put(usePath + '/theme', authMiddleware, changeThemeControl)
  .put(usePath + '/language', authMiddleware, changeLanguageControl)
  .put(usePath + '/snippet', authMiddleware, getPreferencesControl);

export default userRouter;
