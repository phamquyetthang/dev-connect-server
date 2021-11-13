import { taskStatusModel } from '../../../models/project/extensions/model';
import taskModel from '../../../models/tasks/models';

export async function getListTaskService(unitId: string) {
  const docs = await taskModel.find({ unitId });
  return docs;
}

export async function getListStatusTaskService(projectId: string) {
  const docs = await taskStatusModel.find({ projectId });
  return docs;
}
