import { INotification } from './interface';
import { Schema, Types, model, Document } from 'mongoose';
const notificationSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: String,
    url: {
      type: String,
      require: true,
    },
    to: [
      {
        type: Types.ObjectId(),
        ref: 'Accounts',
      },
    ],
    seen: [
      {
        type: Types.ObjectId(),
        ref: 'Accounts',
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const notificationModel = model<INotification & Document>(
  'notifications',
  notificationSchema
);

export default notificationModel;
