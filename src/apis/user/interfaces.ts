import { ISnippet } from "../../models/user/preferences/interface";
import { IExperience, ISocial } from "../../models/user/profile/interface";

export interface IEditUserBasicReq {
  first_name: string;
  last_name: string;
  email: string;
}

export interface IEditUserProfileReq{
  company?: string;
  website?: string;
  location?: string;
  status?: string;
  skills?: string;
  bio?: string;
}
export interface IChangePasswordReq{
  oldPassWord: string,
  newPassWord: string
}
export interface IEditPreferenceReq {
  userId: string;
  theme?: string;
  language?: string;
}
export interface IAddSnippetReq {
  userId: string;
  snippet: Omit<ISnippet, '_id' >;
}
export interface IEditSnippetReq {
  userId: string;
  snippetId: string;
  snippet:  Omit<ISnippet, '_id' >;
}
