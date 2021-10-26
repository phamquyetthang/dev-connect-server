import HttpException from '../../../common/helpers/HttpException';
import ITodo from '../../../models/user/todo/interface';
import todoModel from '../../../models/user/todo/model';
import { IChangeIndexReq, IUpdateTodoReq } from '../interface';

export async function updateTodoService(request: IUpdateTodoReq) {
  const todo = await todoModel.findByIdAndUpdate(request.id, request, {
    upsert: true,
    new: true,
  });
  if (!todo) {
    throw new HttpException(400, 'task không tồn tại');
  }
  return todo;
}

export async function changeIndexService(request: IChangeIndexReq) {
  const currentTodo = await todoModel.findById(request.id).exec();
  if (!currentTodo) {
    throw new HttpException(400, 'khong ton tai');
  }
  await todoModel.updateMany(
    {
      $and: [
        { number: { $gt: currentTodo.number } },
        { number: { $lte: request.newNumber } },
      ],
    },
    {
      $inc: { number: -1 },
    }
  );
  currentTodo.number = request.newNumber;
  await currentTodo.save();
  const newList = await todoModel.find().sort({ number: -1 });
  return newList;
}
