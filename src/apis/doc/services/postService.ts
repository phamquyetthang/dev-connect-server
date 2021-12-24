import HttpException from '../../../common/helpers/HttpException';
import docModel from '../../../models/doc/model';
import projectModel from '../../../models/project/information/model';
import IDoc from '../../../models/doc/interface';
import userModel from '../../../models/user/account/model';

export async function createDocService(
  request: Omit<IDoc, '_id'>,
  projectId: string
) {
  const user = await projectModel.findById(projectId);
  if (!user) {
    throw new HttpException(400, 'Tài khoản của bạn không tồn tại');
  }
  const newDoc = new docModel({
    projectId: projectId,
    description: request.description,
    host: request.host,
    endpoint: request.endpoint,
    method: request.method,
    title: request.title,
    members: request.members,
    requestType: request.requestType,
    requestBody: request.requestBody,
    responseType: request.requestType,
    responseBody: request.requestBody,
  } as IDoc);
  const project = await newDoc.save();

  // await projectModel.findByIdAndUpdate(request.projectId, {
  //   $push: { unit: { unit_id: project._id, name: project.title } },
  // });

  return project;
}

export async function addMemberDocService(docId: string, listUserId: string[]) {
  const users = await userModel.find({ _id: { $in: listUserId } });
  if (!users) {
    throw new HttpException(400, 'user id không tồn tại');
  }

  const members = users.map((user) => ({
    id_member: user._id,
    name: `${user.first_name} ${user.last_name}`,
  }));
  
  const doc = await docModel.findByIdAndUpdate(
    docId,
    {
      members,
    },
    { new: true }
  );

  return doc?.members || [];
}
