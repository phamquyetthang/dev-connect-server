import HttpException from '../../../common/helpers/HttpException';
import userSchema from '../../../models/user/account/model';
import docModel from '../../../models/doc/model';
import projectModel from '../../../models/project/information/model';
import { ICreateDocReq } from '../interface';

export async function createDocService(request: ICreateDocReq, userId: string) {
  const user = await userSchema.findById(userId);
  if (!user) {
    throw new HttpException(400, 'Tài khoản của bạn không tồn tại');
  }
  const newDoc = new docModel({
    description: request.description,
    endpoint: request.endpoint,
    method: request.method,
    title: request.title,
    members: request.members,
    requestType: request.requestType,
    requestBody: request.requestBody,
    responseType: request.requestType,
    responseBody: request.requestBody,
  } as ICreateDocReq);
  const project = await newDoc.save();

  await projectModel.findByIdAndUpdate(request.projectId, {
    $push: { unit: { unit_id: project._id, name: project.title } },
  });
  
  return project;
}
