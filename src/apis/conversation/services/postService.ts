import HttpException from '../../../common/helpers/HttpException';
import { IMessage } from '../../../models/conversation/interface';
import conversationModel from '../../../models/conversation/model';
import docModel from '../../../models/doc/model';
import { ICreateChatroomReq, ISendMessageUserReq } from '../interface';

export async function createChatroomService(
  userId: string,
  request: ICreateChatroomReq
) {
  const groupName = request.name || `Group ${request.member?.length} member`;
  if (request.all) {
    const newConversation = new conversationModel({
      name: groupName,
      projectId: request.projectId,
      admin: [userId],
      members: [userId],
    });
    await newConversation.save();
    return newConversation;
  } else {
    const newConversation = new conversationModel({
      name: groupName,
      projectId: request.projectId,
      admin: [userId],
      members: request.member,
      isSingle: request.member?.length === 2,
    });
    await newConversation.save();
    return newConversation;
  }
}

export async function sendMessageToGroupService(
  userId: string,
  request: ISendMessageUserReq
) {
  // if (!request.conversationId) {
  //   let newConversation = await conversationModel
  //     .findOne({
  //       $or: [
  //         { $and: [{ user1: userId }, { user2: request.to }] },
  //         { $and: [{ user1: request.to }, { user2: userId }] },
  //       ],
  //     })
  //     .exec();
  //   if (newConversation) {
  //     newConversation.messages.unshift({
  //       to: request.to,
  //       text: request.text,
  //       from: userId,
  //     } as IMessage);
  //   } else {
  //     newConversation = new conversationModel({
  //       user1: userId,
  //       user2: request.to,
  //       messages: [
  //         {
  //           from: userId,
  //           to: request.to,
  //           text: request.text,
  //         },
  //       ],
  //     });
  //   }

  //   await newConversation.save();
  //   return newConversation;
  // } else {
  const conversation = await conversationModel
    .findById(request.conversationId)
    .exec();

  if (!conversation) {
    throw new HttpException(400, 'Conversation id is not exist');
  }
  conversation.messages.unshift({
    text: request.text,
    from: userId,
  } as IMessage);
  await conversation.save();
  return conversation;
  // }
}

export async function createChatDocService(userId: string, docId: string) {
  const doc = await docModel
    .findById(docId)
    .select('title members projectId')
    .exec();
  const members = doc?.members.map((i) => i.id_member) || [];
  const newConversation = new conversationModel({
    name: doc?.title,
    projectId: doc?.projectId,
    unitId: doc?._id,
    admin: [userId],
    members,
    isSingle: members?.length === 2,
  });
  await newConversation.save();
  return newConversation;
}
