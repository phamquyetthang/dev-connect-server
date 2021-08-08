export default interface IDoc {
  _id: string;
  method: string;
  endpoint: string;
  description: string;
  members: string[];
  extension: string[];
}
