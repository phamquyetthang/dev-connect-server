export default interface IProfile {
  _id: string;
  user: string;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string;
  bio: string;
  experience: IExperience[];
  education: [];
  social: ISocial;
}
export interface IExperience {
  _id: string;
  title: string;
  company: string;
  location: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

export interface IEducation {
  _id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

export interface ISocial extends Record<string, string> {
  youtube: string;
  twitter: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  zalo: string;
}