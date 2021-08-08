enum PERMISSION {
  READ = 'READ',
  EDIT = 'EDIT',
  CREATE = 'CREATE',
  DELETE = 'DELETE',
}
export default interface IPermission {
  _id: string;
  name: PERMISSION;
}
