import HttpException from '../../../common/helpers/HttpException';
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
  const checkDuplicate = await todoModel.aggregate([
    { $group: { _id: '$number', count: { $sum: 1 } } },
    {
      $match: { count: { $gte: 2 } },
    },
  ]);

  if (checkDuplicate.length) {
    throw new HttpException(409, `have duplicate field ${checkDuplicate}`);
  }

  const currentTodo = await todoModel.findById(request.id).exec();
  if (!currentTodo) {
    throw new HttpException(400, 'khong ton tai');
  }

  if (request.newNumber > currentTodo.number) {
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
  } else {
    await todoModel.updateMany(
      {
        $and: [
          { number: { $gte: request.newNumber } },
          { number: { $lte: currentTodo.number } },
        ],
      },
      {
        $inc: { number: 1 },
      }
    );
  }

  currentTodo.number = request.newNumber;
  await currentTodo.save();
  const newList = await todoModel.find().sort({ number: -1 });
  return newList;
}

export async function deleteTodoService(id: string) {
  const todo = await todoModel.findByIdAndRemove(id);
  return todo;
}
