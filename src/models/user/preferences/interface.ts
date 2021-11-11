export default interface IUserPreferences {
  userId: string;
  theme: string;
  language: string;
  snippets: Array<{
    name: string;
    template: string;
    isDefault: boolean;
  }>;
}
