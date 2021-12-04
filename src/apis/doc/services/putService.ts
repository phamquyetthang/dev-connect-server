import docModel from '../../../models/doc/model';
import { IEditDocReq } from '../interface';

export async function editDocService({ userId, docId, data }: IEditDocReq) {
  return await docModel.updateDocByUser(userId, docId, { ...data });
}
