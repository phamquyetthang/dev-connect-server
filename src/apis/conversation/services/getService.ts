import HttpException from '../../../common/helpers/HttpException';
import { IConversation } from '../../../models/conversation/interface';
import conversationModel from '../../../models/conversation/model';
import todoModel from '../../../models/user/todo/model';

export async function getMyChatsService(userId: string) {
  const conversations = await conversationModel
    .find({
      $or: [{ user1: userId }, { user2: userId }],
    })
    .sort({ recent_date: -1 })
    .exec();
  return conversations;
}

export async function getOneChatsService(userId: string, useIdTo: string) {
  const conversations = await conversationModel
    .findOne({
      $or: [
        { $and: [{ user1: userId }, { user2: useIdTo }] },
        { $and: [{ user1: useIdTo }, { user2: userId }] },
      ],
    })
    .sort({ updatedAt: -1 })
    .exec() as IConversation;
  if (!conversations) {
    throw new HttpException(400, 'Conversation id is not exist');
  }
  return conversations;
}
