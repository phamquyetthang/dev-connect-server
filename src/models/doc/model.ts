import mongoose, { Document, Model } from 'mongoose';
import docEventLogMiddleware from '../../common/middleware/eventLogDoc';
import { updateDocByUser } from '../../common/static';
import IDoc, {
  IDocEdit,
  IDocHistory,
  IDocSchema,
  InstanceMethods,
} from './interface';

const { Schema } = mongoose;

const docStatusSchema = new Schema({
  name: {
    type: String,
  },
  code: {
    type: Number,
  },
  description: {
    type: String,
  },
});

export const docStatusModel = mongoose.model('DocStatus', docStatusSchema);

const docHistorySchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Accounts',
    },
    docId: {
      type: Schema.Types.ObjectId,
      ref: 'Docs',
    },
    diff: Schema.Types.Mixed,
  },
  { timestamps: { createdAt: true } }
);

export const docHistoryModel = mongoose.model<IDocHistory & Document>(
  'DocHistories',
  docHistorySchema
);

const docSchema = new Schema<
  IDoc,
  Model<IDoc, {}, InstanceMethods>,
  undefined,
  InstanceMethods
>({
  projectId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'Projects',
  },
  title: {
    type: String,
    require: true,
  },
  method: {
    type: String,
    require: true,
    enum: [
      'GET',
      'HEAD',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'CONNECT',
      'OPTIONS',
      'TRACE',
    ],
  },
  host: String,
  endpoint: {
    type: String,
    require: true,
  },
  requestType: {
    type: String,
    require: true,
  },
  requestBody: Object,
  responseType: {
    type: String,
    require: true,
  },
  responseBody: Object,
  status: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DocStatus',
    },
  ],
  description: {
    type: String,
    require: true,
  },
  members: [
    {
      _id: false,
      id_member: {
        type: Schema.Types.ObjectId,
        ref: 'Accounts',
      },
      name: {
        type: String,
        require: true,
      },
    },
  ],
  extension: {
    type: String,
  },
  tasks: {
    type: Schema.Types.ObjectId,
    ref: 'Tasks',
  },
});
docSchema.index({ '$**': 'text' });

docSchema.plugin(docEventLogMiddleware);
docSchema.statics.updateDocByUser = updateDocByUser;
interface IUserDocument extends IDocSchema, Document {
  eventLog: (data: any) => void;
}
interface IUserModel extends Model<IUserDocument> {
  updateDocByUser(
    userId: string,
    docId: string,
    update: IDocEdit
  ): Promise<any>;
}
const docModel = mongoose.model<IUserDocument, IUserModel>('Docs', docSchema);

export default docModel;
