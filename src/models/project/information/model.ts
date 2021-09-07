import { Document, model, Schema } from 'mongoose';
import IInfoProject from './interface';

const projectSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    originator: {
      id: { type: Schema.Types.ObjectId, ref: 'Accounts' },
      name: String,
    },
    members: [
      {
        member_id: {
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
    description: {
      type: String,
      require: true,
    },
    readme: {
      type: String,
    },
    files: [
      {
        title: String,
        file: String,
      },
    ],
    links: [
      {
        title: String,
        link: String,
      },
    ],
    units: [
      {
        unit_id: Schema.Types.ObjectId,
        name: String,
      },
    ],
  },
  { timestamps: { createdAt: true } }
);

export default model<IInfoProject & Document>('Projects', projectSchema);
