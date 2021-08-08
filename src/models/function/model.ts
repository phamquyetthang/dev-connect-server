import mongoose from 'mongoose';
import IFunction from './interface';
const { Schema } = mongoose;
const functionSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  members: [
    {
      member: {
        type: Schema.Types.ObjectId,
        ref: 'Accounts',
        require: true,
        unique: true,
      },
      name: {
        type: String,
        require: true,
      },
      position: {
        type: String,
        require: true,
      },
    },
  ],
  docs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Docs',
    },
  ],
});

export default mongoose.model<IFunction & mongoose.Document>(
  'Functions',
  functionSchema
);
