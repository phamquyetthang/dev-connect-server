import isEmpty from 'lodash/isEmpty';
import IDoc, { IDocSchema } from '../../models/doc/interface';
import docModel from '../../models/doc/model';

export async function updateDocByUser(
  userId: string,
  docId: string,
  update: IDocSchema
) {
  const currentDoc = (await docModel.findById(docId).exec()) as IDoc;
  type DocKeyType = keyof IDocSchema;
  Object.keys(update).forEach((item: string) => {
    const key = item as DocKeyType;
    if (update[key] === currentDoc[key]) {
      delete update[key];
    }
  });

  if (isEmpty(update)) {
    return currentDoc;
  }
  
  const doc = await docModel.findByIdAndUpdate(docId, update, { new: true });
  doc?.eventLog(userId);
  return doc;
}
