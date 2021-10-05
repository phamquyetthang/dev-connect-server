import HttpException from '../../../common/helpers/HttpException';
import projectModel from '../../../models/project/information/model';
import userSchema from '../../../models/user/account/model';

export async function getListDocService(userId: string) {
  const user = await userSchema.findById(userId);
  if (!user) {
    throw new HttpException(400, 'Tài khoản của bạn không tồn tại');
  }

  const projects = await projectModel
    .find({
      members: { $elemMatch: { member_id: userId } },
    })
    .select(['name', 'description', 'originator']);
  return projects;
}
