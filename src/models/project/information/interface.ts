export default interface IInfoProject {
  _id: string;
  name: string;
  members?: IMember[];
  description: string;
  originator: IOriginator;
  readme?: string;
  files?: IFile[];
  links?: ILink[];
  units?: IUnit[];
  createdAt: Date;
}
interface IOriginator{
  id: string;
  name: string
}
interface IMember {
  member_id: string;
  name: string;
  permission: string;
}

interface IUnit {
  unit_id: string;
  name: string;
}

interface IFile{
    title: string;
    file: string;
}

interface ILink{
    title: string;
    file: string;
}