import ITodo from '../../models/user/todo/interface';

export type ICreateTodoReq = Omit<ITodo, '_id' | 'user_id' | 'status' | 'number'>;
