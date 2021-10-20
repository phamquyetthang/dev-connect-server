export interface IConversation {
  user1: string;
  user2: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  from: string;
  to: string;
  read: boolean;
  text: string;
  show_on_from: boolean;
  show_on_to: boolean;
  date: Date;
}
