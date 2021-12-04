import pagingHelper from '../../../common/helpers/pagingHelper';
import docModel, { docHistoryModel } from '../../../models/doc/model';
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
    .select('-projectId -requestBody -requestType -responseBody -responseType');
  const data = await pagingHelper(docs, page);
  return data;
}

export async function getDocHistoryService(docId: string) {
  return await docHistoryModel
    .find({ docId })
    .sort({ createdAt: -1 })
    .populate('author', 'first_name last_name')
    .select('-updatedAt -_id');
}
