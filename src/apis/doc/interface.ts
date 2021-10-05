import IDoc from '../../models/doc/interface';

export type ICreateDocReq = IDoc & {
  projectId: string;
};
