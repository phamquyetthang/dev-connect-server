export interface INotification{
  title: string;
  description: string;
  url: string;
  to: string[];
  seen: string[];
  createdAt: Date;
}