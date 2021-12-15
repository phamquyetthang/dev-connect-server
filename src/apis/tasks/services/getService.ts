import HttpException from '../../../common/helpers/HttpException';
import pagingHelper from '../../../common/helpers/pagingHelper';
import docModel from '../../../models/doc/model';
import taskModel from '../../../models/tasks/models';

export async function getListTaskService(
  projectId: string,
  page: number,
  searchKey: string
) {
  const listUnit = await docModel.find({ projectId }).select('units').exec();
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
    .populate('assignee', '_id first_name last_name');
  const data = await pagingHelper(task, page);
  return data;
}
