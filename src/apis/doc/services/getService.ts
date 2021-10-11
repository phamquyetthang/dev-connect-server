import docModel from '../../../models/doc/model';
export async function getListDocService(projectId: string) {
  const docs = await docModel.find({ projectId });
  return docs;
}
