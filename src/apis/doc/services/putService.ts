import docModel from '../../../models/doc/model';
import { IEditDocReq } from '../interface';

export async function editDocService({ userId, docId, data }: IEditDocReq) {
  return await docModel.updateDocByUser(userId, docId, { ...data });
}

export async function deleteMemberDocService(docId: string, userId: string) {
  const doc = await docModel.findByIdAndUpdate(
    docId,
    { $pull: { members: { id_member: userId } } },
    { new: true }
  );

  return doc?.members || [];
}
