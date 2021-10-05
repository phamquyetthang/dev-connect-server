import HttpException from '../../../common/helpers/HttpException';
import projectModel from '../../../models/project/information/model';
import userModel from '../../../models/user/account/model';

export async function addMemberService(email: string, projectId: string) {
  const member = await userModel.findOne({ email: email });
  if (!member) {
    throw new HttpException(400, 'Người dùng này không tồn tại');
  }
  try {
    const project = await projectModel.findByIdAndUpdate(projectId, {
      $push: {
        "member": {
          member_id: member._id,
          name: `${member.first_name} ${member.last_name}`,
          position: 'test',
        },
      },
    });

    if (project) {
      return {
        success: true,
      };
    }
  } catch (error) {
    throw new HttpException(401, 'error');
  }
}
