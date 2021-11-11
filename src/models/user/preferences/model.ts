import { string } from 'joi';
import { Document, model, Schema } from 'mongoose';
import IUserPreferences from './interface';
const userPreferencesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Accounts',
  },
  theme: {
    type: String,
    require: true,
    default: 'light',
  },
  language: {
    type: String,
    require: true,
    default: 'vn',
  },
  snippets: [
    {
      name: {
        type: String,
        require: true,
      },
      template: {
        type: String,
        require: true,
      },
      isDefault: {
        type: Boolean,
        require: true,
        default: false,
      },
    },
  ],
});

const userPreferencesModel = model<IUserPreferences & Document>(
  'UserPreferences',
  userPreferencesSchema
);
export default userPreferencesModel;
