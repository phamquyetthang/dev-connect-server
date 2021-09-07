import mongoose from 'mongoose';
import IUser from './interface';
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Projects'
    },
    position: {
      type: String,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin-permissions',
      },
    ], // permissions phai chi theo tung doc (trong moi use là admin permissions)
  },
  { timestamps: { createdAt: true } }
);

export default mongoose.model<IUser & mongoose.Document>(
  'Accounts',
  userSchema
);
