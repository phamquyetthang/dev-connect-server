import ITodo from "../../../models/user/todo/interface";
import todoModel from "../../../models/user/todo/model";
import { ICreateTodoReq } from "../interface";

export async function createTodoService(
  request: ICreateTodoReq,
  userId: string
) {
  const todoNumber = await todoModel.countDocuments({user_id: userId}).exec() as number;
  const newProject = new todoModel({
    user_id: userId,
    number: todoNumber,
    title: request.title,
    description: request.description,
    deadline: request.deadline,
  } as ITodo);
  const project = await newProject.save();
  return project;
}
