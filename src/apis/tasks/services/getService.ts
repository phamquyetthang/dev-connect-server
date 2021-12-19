import HttpException from '../../../common/helpers/HttpException';
import pagingHelper from '../../../common/helpers/pagingHelper';
import docModel from '../../../models/doc/model';
import taskModel, { taskHistoryModel } from '../../../models/tasks/models';

export async function getListTaskService(
  projectId: string,
  page: number,
  searchKey: string
) {
  const listUnit = await docModel
    .find({ projectId })
    .select('units')
    .sort({ updatedAt: -1 })
    .exec();
  if (!listUnit) {
    throw new HttpException(400, 'project id khong ton tai');
  }
  const listUnitId = listUnit.map((item) => item._id);
  const task = taskModel
    .find({
      unitId: { $in: listUnitId || [] },
      ...(!!searchKey && { $text: { $search: searchKey } }),
    })
    .populate('status', '_id name color')
    .populate('tags', '_id title')
    .populate('assignee', '_id first_name last_name')
    .populate('unitId', '_id title')
    .sort({ createdAt: -1 });
  const data = await pagingHelper(task, page);
  return data;
}

export async function getTaskDetailService(taskId: string) {
  return await taskModel.findById(taskId).select('-createdAt -updatedAt');
  // .populate('unitId', '_id members');
}

export async function getTaskHistoryService(taskId: string) {
  return await taskHistoryModel
    .find({ taskId })
    .sort({ createdAt: -1 })
    .populate('author', 'first_name last_name')
    .select('-updatedAt -_id');
}
