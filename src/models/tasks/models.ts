import { isEmpty, isEqual } from 'lodash';
import moment from 'moment';
import { Document, Model, model, Schema } from 'mongoose';
import taskEventLogMiddleware from '../../common/middleware/eventLogTask';
// import { updateTaskByUser } from '../../common/static';
import {
  ITask,
  ITaskHistory,
  ITaskInModel,
  ITaskSchema,
  ITaskUpdate,
} from './interface';

const taskHistorySchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Accounts',
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: 'Tasks',
    },
    diff: Schema.Types.Mixed,
  },
  { timestamps: { createdAt: true } }
);

export const taskHistoryModel = model<ITaskHistory & Document>(
  'taskHistories',
  taskHistorySchema
);

const taskSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Projects',
      require: true,
    },
    unitId: {
      type: Schema.Types.ObjectId,
      ref: 'Docs',
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'tagTasks',
      },
    ],
    assignee: {
      type: Schema.Types.ObjectId,
      ref: 'Accounts',
      require: true,
    },
    deadline: Date,
    status: {
      type: Schema.Types.ObjectId,
      ref: 'TaskStatus',
    },
  },
  { timestamps: true }
);

// console.log(typeof docEventLogMiddleware)
taskSchema.plugin(taskEventLogMiddleware);
async function updateTaskByUser(
  userId: string,
  taskId: string,
  update: ITaskUpdate
) {
  const currentTask = (await taskModel.findById(taskId).exec()) as ITask;
  type TaskKeyType = keyof ITaskUpdate;
  Object.keys(update).forEach((item: string) => {
    const key = item as TaskKeyType;
    if (key === 'deadline' && moment(update[key]).isSame(currentTask[key])) {
      delete update[key];
    } else if (key === 'tags') {
      const tagArr = currentTask.tags.map((id) => id + '');
      if (isEqual(update[key], tagArr)) {
        delete update[key];
      }
    } else {
      if (update[key] === currentTask[key] + '') {
        delete update[key];
      }
    }
  });

  if (isEmpty(update)) {
    return currentTask;
  }

  const task = await taskModel.findByIdAndUpdate(taskId, update, { new: true });
  task?.eventLog(userId);
  return task;
}
taskSchema.statics.updateTaskByUser = updateTaskByUser;
interface ITaskDocument extends ITaskSchema, Document {
  eventLog: (data: any) => void;
}
interface ITaskModel extends Model<ITaskDocument> {
  updateTaskByUser(
    userId: string,
    taskId: string,
    update: ITaskUpdate
  ): Promise<any>;
}

const taskModel = model<ITaskDocument, ITaskModel>('Tasks', taskSchema);

export default taskModel;
