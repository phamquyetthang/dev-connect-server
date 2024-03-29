import HttpException from '../../../common/helpers/HttpException';
import { tagTaskModel, taskStatusModel } from '../../../models/project/extensions/model';
import projectModel from '../../../models/project/information/model';
import userSchema from '../../../models/user/account/model';

export async function getListProjectService(userId: string) {
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

export async function getInfoProjectService(projectId: string) {
  const project = await projectModel.findById(projectId);
  if (!project) {
    throw new HttpException(400, 'Dự án này không tồn tại');
  }
  return project;
}

export async function getProjectMemberService(projectId: string) {
  const project = await projectModel.findById(projectId).select('members');
  if (!project) {
    throw new HttpException(400, 'Dự án này không tồn tại');
  }
  return project.members;
}

export async function getTagTasksService(projectId: string) {
  return await tagTaskModel.find({ projectId });
}


export async function getListStatusTaskService(projectId: string) {
  const status = await taskStatusModel.find({ projectId });
  return status;
}
