export interface ITask {
  _id: string;
  projectId: string;
  unitId: string;
  title: string;
  description: string;
  tags: string[];
  assignee: string;
  deadline?: Date;
  status: string;
}
