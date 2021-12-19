import isEmpty from 'lodash/isEmpty';
import IDoc, { IDocSchema } from '../../models/doc/interface';
import docModel from '../../models/doc/model';
import { ITask, ITaskUpdate } from '../../models/tasks/interface';
import taskModel from '../../models/tasks/models';

export async function updateDocByUser(
  userId: string,
  docId: string,
  update: IDocSchema
) {
  const currentDoc = (await docModel.findById(docId).exec()) as IDoc;
  type DocKeyType = keyof IDocSchema;
  Object.keys(update).forEach((item: string) => {
    const key = item as DocKeyType;
    if (update[key] === currentDoc[key]) {
      delete update[key];
    }
  });

  if (isEmpty(update)) {
    return currentDoc;
  }

  const doc = await docModel.findByIdAndUpdate(docId, update, { new: true });
  doc?.eventLog(userId);
  return doc;
}

export async function updateTaskByUser(
  userId: string,
  taskId: string,
  update: ITaskUpdate
) {
  const currentTask = (await taskModel.findById(taskId).exec()) as ITask;
  type TaskKeyType = keyof ITaskUpdate;
  Object.keys(update).forEach((item: string) => {
    const key = item as TaskKeyType;
    if (update[key] === currentTask[key]) {
      delete update[key];
    }
  });

  if (isEmpty(update)) {
    return currentTask;
  }
  console.log('🚀 ~ file: index.ts ~ line 46 ~ update', update);
  const task = await taskModel.findByIdAndUpdate(taskId, update, { new: true });
  task?.eventLog(userId);
  return task;
}
