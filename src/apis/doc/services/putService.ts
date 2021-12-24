import docModel from '../../../models/doc/model';
import { IEditDocReq } from '../interface';

export async function editDocService({ userId, docId, data }: IEditDocReq) {
  return await docModel.updateDocByUser(userId, docId, { ...data });
}

export async function deleteMemberDocService(docId: string, userId: string) {
  const doc = await docModel.findById(docId);

  if (doc?.members) {
    const oldMembers = [...doc?.members];
    doc.members = oldMembers.filter((mem) => {
      return mem.id_member + '' !== userId;
    });
  }
  await doc?.save();

  return doc?.members || [];
}
