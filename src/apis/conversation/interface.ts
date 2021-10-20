import { IMessage } from '../../models/conversation/interface';
import ITodo from '../../models/user/todo/interface';

export type ISendMessageReq = Omit<IMessage, '_id' | 'user_id' | 'status' | 'number'> & {
    conversationId?: string,

};
