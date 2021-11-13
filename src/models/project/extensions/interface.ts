
export interface ITaskStatus{
    _id: string;
    projectId: string;
    name: string;
    description?: string;
    color?: string;
}
export interface ITaskTemplate{
    _id: string;
    projectId: string;
    name: string;
    content: string;
}