import HttpException from '../../../common/helpers/HttpException';
import IInfoProject from '../../../models/project/information/interface';
import userSchema from '../../../models/user/account/model';
import projectModel from '../../../models/project/information/model';
import { ICreateProjectReq, ICreateStatusTaskReq } from '../interface';
import { tagTaskModel, taskStatusModel } from '../../../models/project/extensions/model';

export async function createProjectService(
  request: ICreateProjectReq,
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

export async function createTagTaskService(projectId: string, title: string) {
  const tag = await tagTaskModel.create({ projectId, title });
  return tag;
}


export async function createStatusTaskService({
  statusData,
  projectId,
}: ICreateStatusTaskReq) {
  const project = await projectModel.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'projectId is not exist');
  }
  const newStatus = await taskStatusModel.create({
    ...statusData,
    projectId,
  })
  
  return newStatus;
}
