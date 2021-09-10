import HttpException from '../../../common/helpers/HttpException';
import userModel from '../../../models/user/account/model';

export const getInfoService = async (id: string) => {
  const user = await userModel
    .findById(id);
  if (!user) {
    throw new HttpException(400, 'Account is not exit');
  }
  return user;
};
