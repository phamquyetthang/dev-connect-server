export default interface ITodo {
  _id: string;
  user_id: string;
  number: number;
  title: string;
  description: string;
  deadline?: Date;
  status: boolean;
}
