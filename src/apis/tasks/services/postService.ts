import HttpException from '../../../common/helpers/HttpException';
import docModel from '../../../models/doc/model';
import { ICreateTaskReq } from '../interface';
import taskModel from '../../../models/tasks/models';

export async function createTaskService({ taskData, unitId }: ICreateTaskReq) {
  const doc = await docModel.findById(unitId);
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
    })
    .catch((err) => console.log(err));

  return newTask;
}
