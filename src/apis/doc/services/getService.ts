import pagingHelper from '../../../common/helpers/pagingHelper';
import docModel from '../../../models/doc/model';
export async function getListDocService(
  projectId: string,
  searchKey: string,
  page: number
) {
  
  const docs = docModel.find({
    projectId,
    ...(!!searchKey && { $text: { $search: searchKey } }),
  }).select('-projectId -requestBody -requestType -responseBody -responseType');
  const data = await pagingHelper(docs, page);
  return data;
}
