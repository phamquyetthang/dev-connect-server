import { Document, model, Schema } from 'mongoose';
import { ITagTask, ITaskStatus, ITaskTemplate } from './interface';

const taskStatusSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Projects',
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  description: String,
  color: String,
});
export const taskStatusModel = model<ITaskStatus & Document>(
  'TaskStatus',
  taskStatusSchema
);

const templateTaskSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Projects',
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
});

export const taskTemplateModel = model<ITaskTemplate & Document>(
  'TaskTemplates',
  templateTaskSchema
);

const tagTaskSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Projects',
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
});

export const tagTaskModel = model<ITagTask & Document>(
  'tagTasks',
  tagTaskSchema
);
