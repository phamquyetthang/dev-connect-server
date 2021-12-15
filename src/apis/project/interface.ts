import { ITaskStatus } from "../../models/project/extensions/interface";

export interface ICreateProjectReq{
    name: string;
    description: string;
    readme?: string;
}
export type ICreateStatusTaskReq = {
    statusData: Omit<ITaskStatus, '_id' | 'projectId'>;
    projectId: string;
  };
  