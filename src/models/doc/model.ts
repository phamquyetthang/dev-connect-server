import mongoose from 'mongoose';

const { Schema } = mongoose;

const docRequestSchema = new Schema({
  field: {
    type: String,
  },
  type: {
    type: String,
  },
  is_require: { type: Boolean },
  root: {
    type: Boolean,
    default: false,
  },
  child: {
    type: Schema.Types.ObjectId,
    ref: 'DocRequests',
  },
});

export const docRequests = mongoose.model('DocRequests', docRequestSchema);

const docSchema = new Schema({
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
  request: [docRequestSchema],
  response: [
    {
      type: Object,
    },
  ],
  status: [
    {
      name: {
        type: String,
      },
      code: {
        type: Number,
      },
      description: {
        type: String,
      },
    },
  ],
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

export default mongoose.model('Docs', docSchema);
