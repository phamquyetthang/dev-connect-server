import { model, Schema } from 'mongoose';
import ITodo from './interface';

const todoSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'Accounts',
      require: true,
    },
    number: {
      type: Number,
      require: true,
      // unique: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    deadline: {
      type: Date,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
todoSchema.index({ '$**': 'text' });
const todoModel = model<ITodo & Document>('TodoTasks', todoSchema);
export default todoModel;
