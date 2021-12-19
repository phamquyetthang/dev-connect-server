import { Schema } from "mongoose";

export interface ITaskSchema {
  projectId: string;
  unitId:  string;
  title: string;
  description: string;
  tags: string[];
  assignee: string;
  deadline?: Date;
  status: string;
}
export type ITask = ITaskSchema & {
  _id: string;
};
export type ITaskInModel =  {
  _id: Schema.Types.ObjectId;
  projectId: Schema.Types.ObjectId;
  unitId:  Schema.Types.ObjectId;
  title: string;
  description: string;
  tags: Schema.Types.ObjectId[];
  assignee: Schema.Types.ObjectId;
  deadline?: Date;
  status: Schema.Types.ObjectId;
}
export interface ITaskUpdate {
  unitId?: string;
  title?: string;
  description?: string;
  tags?: string[];
  assignee?: string;
  deadline?: Date;
  status?: string;
}

export interface ITaskHistory {
  author: string;
  taskId: string;
  diff: any;
  createdAt: Date;
}
