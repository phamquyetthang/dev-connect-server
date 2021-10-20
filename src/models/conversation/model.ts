import mongoose, { Document, model, Schema } from 'mongoose';

import { IConversation } from './interface';

const ConversationSchema = new Schema({
  user1: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  user2: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  messages: [
    {
      from: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      to: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      show_on_from: {
        type: Boolean,
        default: true,
      },
      show_on_to: {
        type: Boolean,
        default: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
}, {timestamps: true});

const conversationModel = model<IConversation & Document>(
  'conversation',
  ConversationSchema
);
export default conversationModel;
