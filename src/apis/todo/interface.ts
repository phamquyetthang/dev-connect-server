import ITodo from '../../models/user/todo/interface';

export type ICreateTodoReq = Omit<
  ITodo,
  '_id' | 'user_id' | 'status' | 'number'
>;

export type IUpdateTodoReq = Omit<ITodo, '_id' | 'user_id' | 'number'> & {
  id: string;
};

export interface IChangeIndexReq{
    id: string;
    newNumber: number;
}