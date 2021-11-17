import pagingHelper from '../../../common/helpers/pagingHelper';
import { taskStatusModel } from '../../../models/project/extensions/model';
import taskModel from '../../../models/tasks/models';

export async function getListTaskService(
  projectId: string,
  page: number,
  searchKey: string
) {
  const task = taskModel.find({
    projectId,
    ...(!!searchKey && { $text: { $search: searchKey } }),
  });
  const data = await pagingHelper(task, page);
  return data;
}

export async function getListStatusTaskService(projectId: string) {
  const status = await taskStatusModel.find({ projectId });
  return status;
}
