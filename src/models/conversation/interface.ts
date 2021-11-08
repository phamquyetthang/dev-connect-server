export interface IConversation {
  name: string;
  projectId: string;
  unitId: string;
  admin: string[];
  isSingle: boolean;
  members: string[];
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  from: string;
  tag: string[];
  read: boolean;
  text: string;
  show_on_from: boolean;
  show_on_to: boolean;
  date: Date;
}
