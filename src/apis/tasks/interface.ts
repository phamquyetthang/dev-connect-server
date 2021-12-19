import { ITask } from '../../models/tasks/interface';

export type ICreateTaskReq = {
  taskData: Omit<ITask, '_id' | 'unitId'>;
  unitId: string;
};


export type IEditTaskReq = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  assignee: string;
  deadline: Date;
  status: string;
  unitId: string;
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