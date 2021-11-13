import HttpException from '../../../common/helpers/HttpException';
import docModel from '../../../models/doc/model';
import { ICreateStatusTaskReq, ICreateTaskReq } from '../interface';
import taskModel from '../../../models/tasks/models';
import projectModel from '../../../models/project/information/model';
import { taskStatusModel } from '../../../models/project/extensions/model';

export async function createTaskService({ taskData, unitId }: ICreateTaskReq) {
  const doc = await docModel.findByIdAndUpdate(unitId);
  if (!doc) {
    throw new HttpException(400, 'unitId is not exist');
  }
  const newTask = await taskModel
    .create({
      ...taskData,
      unitId,
    })
    .then((res) => {
      doc.updateOne({ $push: { tasks: res._id } });
    });

  return newTask;
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
