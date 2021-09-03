import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AuthRequestType } from '../interface';
import userSchema from '../../../models/user/account/model';
import HttpException from '../../../common/helpers/HttpException';
import sendEmail from '../../../common/helpers/SendEmail';

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

export const forgotPasswordService = async ({ email }: { email: string }) => {
  const user = await userSchema.findOne({ email: email });
  if (!user) {
    throw new HttpException(409, `Email is not exist!`);
  } else {
    try {
      const newPass = Math.random().toString(36).slice(2);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPass, salt);
      user.password = hashedPassword;
      await sendEmail(email, `Mật khẩu mới của bạn là  ${newPass}`);
      await user.save();
      return { data: 'success' };
    } catch (error) {
      throw new HttpException(409, `Lấy lại mật khẩu thất bại`);
    }
  }
};
