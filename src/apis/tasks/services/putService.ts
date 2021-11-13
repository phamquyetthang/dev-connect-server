import { taskStatusModel } from '../../../models/project/extensions/model';
import taskModel from '../../../models/tasks/models';
import { IEditTaskReq, IEditTaskStatusReq } from '../interface';

export async function editTaskService(data: IEditTaskReq) {
  const task = await taskModel.findByIdAndUpdate(data.id, {
    ...data,
  });
  return task;
}

export async function editStatusTaskService(data: IEditTaskStatusReq) {
  const taskStatus = await taskStatusModel.findByIdAndUpdate(data.id, {
    ...data,
  });
  return taskStatus;
}

export async function deleteTaskService(id: string) {
  const task = await taskModel.findByIdAndDelete(id);
  return task;
}

export async function deleteStatusTaskService(id: string) {
  const status = await taskStatusModel.findByIdAndDelete(id);
  return status;
}
