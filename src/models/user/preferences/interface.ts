export default interface IUserPreferences {
  _id: string;
  userId: string;
  theme: string;
  language: string;
  snippets: Array<ISnippet>;
}

export interface ISnippet {
  _id: string;
  name: string;
  template: string;
  isDefault: boolean;
}
