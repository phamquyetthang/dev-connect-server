import mongoose from 'mongoose';

const { Schema } = mongoose;

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
  //   endpoint
});
