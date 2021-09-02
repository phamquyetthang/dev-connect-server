import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AuthRequestType } from '../interface';
import userSchema from '../../../models/user/account/model';
import HttpException from '../../../common/helpers/HttpException';

export const signInService = async ({ email, password }: AuthRequestType) => {
  const user = await userSchema.findOne({ email: email });
  if (!user) {
    throw new HttpException(409, `Email is not exist!`);
  } else {
    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass) throw new HttpException(400, 'Wrong password');
    else {
      return {
        token: jwt.sign(
          {
            id: user._id,
          },
          '123'
        ),
      };
    }
  }
};
