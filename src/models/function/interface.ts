interface IMember {
  _id: string;
  name: string;
  position: string;
}
export default interface IFunction {
  _id: string;
  name: string;
  description: string;
  members: IMember[];
  docs: string[];
}
