export type ISendMessageUserReq = {
  conversationId: string;
  text: string;
};
export interface IAllChatQuery {
  _id: string;
  user1: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  user2: {
    _id: string;
    first_name: string;
    last_name: string;
  };
}

export interface ICreateChatroomReq {
  projectId: string;
  member: string[];
  all?: boolean;
  name?: string;
} 