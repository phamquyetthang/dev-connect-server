import HttpException from '../../../common/helpers/HttpException';
import { IMessage } from '../../../models/conversation/interface';
import conversationModel from '../../../models/conversation/model';
import userModel from '../../../models/user/account/model';
import { ISendMessageReq } from '../interface';

export async function sendMessageService(
  userId: string,
  request: ISendMessageReq
) {
  const toUser = await userModel
    .findById(request.to)
    .select('-password')
    .exec();
  if (!toUser) throw new HttpException(400, 'To user id is not exist');

  if (!request.conversationId) {
    let newConversation = await conversationModel
      .findOne({
        $or: [
          { $and: [{ user1: userId }, { user2: request.to }] },
          { $and: [{ user1: request.to }, { user2: userId }] },
        ],
      })
      .exec();
    if (newConversation) {
      newConversation.messages.unshift({
        to: request.to,
        text: request.text,
        from: userId,
      } as IMessage);
    } else {
      newConversation = new conversationModel({
        user1: userId,
        user2: request.to,
        messages: [
          {
            from: userId,
            to: request.to,
            text: request.text,
          },
        ],
      });
    }

    await newConversation.save();
    return newConversation;
  } else {
    const conversation = await conversationModel
      .findById(request.conversationId)
      .exec();

    if (!conversation) {
      throw new HttpException(400, 'Conversation id is not exist');
    }
    if (
      (conversation.user1 !== userId && conversation.user2 !== request.to) ||
      (conversation.user1 !== request.to && conversation.user2 !== userId)
    ) {
      throw new HttpException(400, 'Conversation id is not valid');
    }
    conversation.messages.unshift({
      to: request.to,
      text: request.text,
      from: userId,
    } as IMessage);
    await conversation.save();
    return conversation;
  }
}
