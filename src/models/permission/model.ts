import mongoose from 'mongoose';
import IPermission from './interface';
const permissionsSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['READ', 'EDIT', 'CREATE', 'DELETE'],
    require: true,
  },
});

export default mongoose.model<IPermission & mongoose.Document>(
  'Permissions',
  permissionsSchema
);
