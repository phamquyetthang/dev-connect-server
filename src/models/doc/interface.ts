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

export default interface IDoc {
  _id: string;
  title: string;
  method: METHOD_API;
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
  extension: string[];
}
