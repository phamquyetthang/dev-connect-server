import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpException from '../../../common/helpers/HttpException';
import IUser from '../../../models/user/account/interface';
import userSchema from '../../../models/user/account/model';


const registerService = async (model: IUser) => {
  const user = await userSchema.findOne({ email: model.email });
  if (user) {
    throw new HttpException(409, `Your email ${model.email} already exist.`);
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(model.password, salt);
    const createdUser: IUser = await userSchema.create({
      ...model,
      password: hashedPassword,
    });

    return {
      token: jwt.sign({id: createdUser._id}, '123'),
    };
  }
};

export default registerService;
