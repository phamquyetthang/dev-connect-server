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

export enum REQUEST_TYPE {
  JSON = 'json',
  FROM_DATA = 'formData',
  X_WWW_FORM_URLENCODED = 'xWwwFormUrlencoded',
}

export interface IDocHistory{
  author: string;
  docId: string;
  diff: any;
  createdAt: Date;
}

export interface IDocEdit {
  // _id: string;
  projectId?: string;
  title?: string;
  method?: METHOD_API;
  host?: string;
  endpoint?: string;
  requestType?: REQUEST_TYPE;
  requestBody?: object;
  responseType?: 'json' | 'text' | 'key_value';
  responseBody?: object;
  status?: IStatus[];
  description?: string;
  members?: Array<{
    id_member?: string;
    name?: string;
  }>;
  tasks?: string[];
}

export interface IDocSchema {
  projectId: string;
  title: string;
  method: METHOD_API;
  host: string;
  endpoint: string;
  requestType: REQUEST_TYPE;
  requestBody: object;
  responseType: 'json' | 'text' | 'key_value';
  responseBody: object;
  status: IStatus[];
  description: string;
  members: Array<{
    id_member: string;
    name: string;
  }>;
  tasks: string[];
}

export default interface IDoc extends IDocSchema{
_id: string;
}
export interface InstanceMethods  {
  eventLog: (data: any) => void;
}
