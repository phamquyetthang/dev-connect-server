import { UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import docModel from '../../models/doc/model';

export async function updateDocByUser(
  userId: string,
  docId: string,
  update?: UpdateQuery<any> | UpdateWithAggregationPipeline
) {
  const doc = await docModel
    .findByIdAndUpdate(docId, update, { new: true });
  doc?.eventLog(userId);
  return doc;
}
