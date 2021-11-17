import todoModel from '../../../models/user/todo/model';

export async function getListTodoService(
  userId: string,
  searchKey?: string,
) {
  const todo = await todoModel
    .find({
      user_id: userId,
      ...(!!searchKey && { $text: { $search: searchKey } }),
    })
    .sort({ number: -1 });

  // if (page) {
  //   todo.skip((page - 1) * 10).limit(10);
  // }
  // const data = await todo;

  // return {
  //   meta: {
  //     page: page,
  //     limit: 10,
  //     total: todo.countDocuments().exec(),
  //   },
  //   data,
  // };
  return todo
}
