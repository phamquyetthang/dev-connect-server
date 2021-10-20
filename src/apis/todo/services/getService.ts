import todoModel from '../../../models/user/todo/model';

export async function getListTodoService(userId: string) {
  const projects = await todoModel
    .find({
      user_id: userId,
    })
  return projects;
}
