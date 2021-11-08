import todoModel from '../../../models/user/todo/model';

export async function getListTodoService(userId: string, searchKey: string) {
  const projects = await todoModel
    .find({
      user_id: userId,
      ...(!!searchKey && { $text: { $search: searchKey } }),
    })
    .sort({ number: -1 });
  return projects;
}
