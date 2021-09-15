import HttpException from '../../../common/helpers/HttpException';
import IInfoProject from '../../../models/project/information/interface';
import userSchema from '../../../models/user/account/model';
import projectModel from '../../../models/project/information/model';
export async function createProjectService(
  request: IInfoProject,
  userId: string
) {
  const user = await userSchema.findById(userId);
  if (!user) {
    throw new HttpException(400, 'Tài khoản của bạn không tồn tại');
  }
  const newProject = new projectModel({
    name: request.name,
    originator: {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
    },
    description: request.description,
    readme: request.readme,
    members: [
      {
        member_id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        position: '',
      },
    ],
  } as IInfoProject);
  const project = await newProject.save();
  return project;
}