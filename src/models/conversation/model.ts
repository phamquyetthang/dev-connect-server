import mongoose, { Document, model, Schema } from 'mongoose';

import { IConversation } from './interface';

const ConversationSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Projects',
      required: true,
    },
    unitId: {
      type: Schema.Types.ObjectId,
      ref: 'Docs',
      trim: true,
      index: true,
      unique: true,
      sparse: true,
    },
    admin: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Accounts',
        required: true,
      },
    ],
    isSingle: {
      type: Boolean,
      required: true,
      default: false,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Accounts',
      },
    ],
    messages: [
      {
        from: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Accounts',
        },
        tag: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Accounts',
          },
        ],
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
  },
  { timestamps: true }
);

const conversationModel = model<IConversation & Document>(
  'conversation',
  ConversationSchema
);
export default conversationModel;
