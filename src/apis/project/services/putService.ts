import HttpException from '../../../common/helpers/HttpException';
import projectModel from '../../../models/project/information/model';
import userModel from '../../../models/user/account/model';
import { IEditProjectReq } from '../interface';

export async function addMemberService(email: string, projectId: string) {
  const member = await userModel.findOne({ email: email });
  if (!member) {
    throw new HttpException(400, 'Người dùng này không tồn tại');
  }
  try {
    const project = await projectModel.findByIdAndUpdate(
      projectId,
      {
        $push: {
          members: {
            member_id: member._id,
            name: `${member.first_name} ${member.last_name}`,
            position: 'test',
          },
        },
      },
      { new: true }
    );

    if (project) {
      return project.members;
    }
  } catch (error) {
    throw new HttpException(401, 'error');
  }
}

export async function editProjectService(request: IEditProjectReq) {
  const newProject = await projectModel.findByIdAndUpdate(
    request.projectId,
    {
      name: request.name,
      description: request.description,
      readme: request.readme,
    },
    { new: true }
  );
  return newProject;
}

export async function deleteMemberService(projectId: string, memberId: string) {
  return await projectModel.findByIdAndUpdate(
    projectId,
    {
      $pull: { members: { member_id: memberId } },
    },
    { new: true }
  );
}
