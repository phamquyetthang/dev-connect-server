import IDoc, { IDocSchema } from '../../models/doc/interface';

export type ICreateDocReq = IDoc & {
  projectId: string;
};
export interface IEditDocReq {
  userId: string;
  docId: string;
  data: Omit<IDocSchema, 'projectId' | 'members'>;
}
