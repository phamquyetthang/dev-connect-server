import { ITaskStatus } from '../../models/project/extensions/interface';
import { ITask } from '../../models/tasks/interface';

export type ICreateTaskReq = {
  taskData: Omit<ITask, '_id' | 'unitId'>;
  unitId: string;
};

export type ICreateStatusTaskReq = {
  statusData: Omit<ITaskStatus, '_id' | 'projectId'>;
  projectId: string;
};

export type IEditTaskReq = {
  id: string;
  title?: string;
  description?: string;
  tags?: string[];
  members?: string[];
  deadline?: Date;
  status?: string;
};

export type IEditTaskStatusReq = {
  id: string;
  name?: string;
  description?: string;
  color?: string;
};


export type IEditTaskTemplateReq = {
  id: string;
  name: string;
  content: string;
};