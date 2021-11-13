export interface ITask {
  _id: string;
  unitId: string;
  title: string;
  description: string;
  tags: string[];
  members: string[];
  deadline?: Date;
  status: string;
}
