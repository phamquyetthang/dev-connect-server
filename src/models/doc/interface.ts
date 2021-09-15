export interface IRequest {
  field: string;
  type: string;
  is_require: boolean;
  root: boolean;
  child: string;
}

interface IStatus {
  name: string;
  code: number;
  description: string;
}

export enum METHOD_API {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
}
export default interface IDoc {
  _id: string;
  title: string;
  method: METHOD_API;
  endpoint: string;
  request: IRequest[];
  response: object[];
  status: IStatus[];
  description: string;
  members: string[];
  extension: string[];
}
