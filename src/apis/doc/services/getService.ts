import pagingHelper from '../../../common/helpers/pagingHelper';
import docModel, { docHistoryModel } from '../../../models/doc/model';
import taskModel from '../../../models/tasks/models';
export async function getListDocService(
  projectId: string,
  searchKey: string,
  page: number
) {
  const docs = docModel
    .find({
      projectId,
      ...(!!searchKey && { $text: { $search: searchKey } }),
    })
    .select('-projectId -requestBody -requestType -responseBody -responseType')
    .sort({ createdAt: -1 });
  const data = await pagingHelper(docs, page);
  return data;
}

export async function getDocDetailService(docId: string) {
  const doc = await docModel
    .findById(docId)
    .select('-_id -projectId -members -tasks -createdAt')
    .exec();
  return doc;
}

export async function getDocMemberService(docId: string) {
  const doc = await docModel.findById(docId).select('members').exec();
  return doc?.members || [];
}

export async function getListDocNameService(projectId: string) {
  const data = await docModel
    .find({
      projectId,
    })
    .select('_id title members');
  return data;
}

export async function getDocHistoryService(docId: string) {
  return await docHistoryModel
    .find({ docId })
    .sort({ createdAt: -1 })
    .populate('author', 'first_name last_name')
    .select('-updatedAt -_id');
}

export async function getListTaskInDocService(docId: string) {
  const tasks = await taskModel
    .find({ unitId: docId })
    .populate('status', '_id name color')
    .populate('tags', '_id title')
    .populate('assignee', '_id first_name last_name')
    .populate('unitId', '_id title')
    .sort({ createdAt: -1 });

  return tasks;
}
