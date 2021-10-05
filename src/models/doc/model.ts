import mongoose from 'mongoose';
import IDoc from './interface';

const { Schema } = mongoose;

const docStatusSchema = new Schema({ // FE done, BE done
  name: {
    type: String,
  },
  code: {
    type: Number,
  },
  description: {
    type: String,
  },
})

export const docStatusModel = mongoose.model('DocStatus', docStatusSchema);


const docSchema = new Schema({
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
  status: [{
    type: Schema.Types.ObjectId,
    ref: 'DocStatus'
  }],
  description: {
    type: String,
    require: true,
  },
  members: [
    {
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
});

const docModel = mongoose.model<IDoc & Document>('Docs', docSchema);
export default docModel;
