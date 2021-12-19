import { Schema } from 'mongoose';
import { taskHistoryModel } from '../../models/tasks/models';
import { ITaskUpdate } from '../../models/tasks/interface';

export default function taskEventLogMiddleware(schema: Schema<any>) {
  const diff: any = {
    from: null,
    to: null,
  };
  let taskId = '';
  schema.pre('findOneAndUpdate', async function () {
    const updateObj = (this as any)?._update;
    console.log('🚀 ~ file: eventLogTask.ts ~ line 13 ~ updateObj', updateObj);
    const docToUpdate = await this.model.findOne(this.getQuery());

    const currentObj: ITaskUpdate = {};
    type KeyType = keyof ITaskUpdate;
    type KeyStringType = keyof Omit<ITaskUpdate, 'tags' | 'deadline'>;
    Object.keys(updateObj).forEach((key: string) => {
      if (!key.includes('$')) {
        switch (key as KeyType) {
          case 'tags':
            const tagArr = docToUpdate.tags.map((id: any) => id + '');
            currentObj[key as KeyType] = tagArr;
            break;
          case 'deadline':
            currentObj[key as KeyType] = docToUpdate[key];
            break;

          default:
            currentObj[key as KeyStringType] = docToUpdate[key] + '';
            break;
        }
      } else {
        delete updateObj[key];
      }
    });

    taskId = docToUpdate._id;
    diff.from = currentObj;
    diff.to = updateObj;
  });

  schema.methods.eventLog = function async(userId: string) {
    console.log(
      '🚀 ~ file: eventLogTask.ts ~ line 27 ~ async ~ userId',
      userId
    );
    console.log('🚀 ~ file: eventLogTask.ts ~ line 27 ~ async ~ diff', diff);
    return taskHistoryModel.create({
      author: userId,
      taskId: taskId,
      diff: diff,
    });
  };
}
