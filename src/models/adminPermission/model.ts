import mongoose from 'mongoose';
import IAdminPermission from './interface';
const adminPermissionsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  permission: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permissions'
  }]
});

export default mongoose.model<IAdminPermission & mongoose.Document>(
  'Admin-permissions',
  adminPermissionsSchema
);
