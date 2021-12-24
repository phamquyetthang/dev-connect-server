import { IDocEdit } from '../../models/doc/interface';
import { Schema } from 'mongoose';
import { docHistoryModel } from '../../models/doc/model';

export default function docEventLogMiddleware(schema: Schema<any>) {
  const diff: any = {
    from: null,
    to: null,
  };
  let docId = '';
  schema.pre('findOneAndUpdate', async function () {
    const updateObj = (this as any)?._update;
    const docToUpdate = await this.model.findOne(this.getQuery());

    const currentObj: IDocEdit = {};
    type KeyType = keyof IDocEdit;
    Object.keys(updateObj).forEach((key: string) => {
      if (!key.includes('$')) {
        currentObj[key as KeyType] = docToUpdate[key];
      } else {
        delete updateObj[key];
      }
    });

    docId = docToUpdate._id;
    diff.from = currentObj;
    diff.to = updateObj;
  });
  
  schema.methods.eventLog = function async(userId: string) {
    return docHistoryModel.create({
      author: userId,
      docId: docId,
      diff: diff,
    });
  };
}
