import HttpException from '../../../common/helpers/HttpException';
import conversationModel from '../../../models/conversation/model';
import { IConversation } from '../../../models/conversation/interface';
import docModel from '../../../models/doc/model';
type IChatContacts = {
  id: string;
  name: string;
  lastMess: string;
  unitId: string;
};

export async function getMyChatsService(userId: string, projectId: string) {
  const conversations = await conversationModel
    .find({
      $and: [
        { projectId: projectId },
        {
          $or: [
            { members: { $exists: true, $ne: [] } },
            { members: { $elemMatch: { member_id: userId } } },
          ],
        },
      ],
    })
    .sort({ updatedAt: -1 })
    .exec();

  const chatContacts: IChatContacts[] = conversations.map((i) => ({
    id: i._id,
    name: i.name,
    lastMess: i.messages[0]?.text || '',
    unitId: i.unitId || '',
  }));

  return chatContacts;
}

export async function getChatContentService(id: string, page: number) {
  const conversations = await conversationModel
    .findById(id)
    .populate('messages.from', '_id first_name last_name');
  if (!conversations) {
    throw new HttpException(400, 'Conversation id is not exist');
  }
  return conversations;
}

export async function getChatFromDocService(
  userId: string,
  docId: string
): Promise<IConversation> {
  const conversation = await conversationModel
    .findOne({ unitId: docId })
    .exec();

  if (!conversation) {
    const doc = await docModel
      .findById(docId)
      .select('_id title members projectId')
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
  return conversation;
}

// export async function getOneChatsService(userId: string, useIdTo: string) {
//   const conversations = (await conversationModel
//     .findOne({
//       $or: [
//         { $and: [{ user1: userId }, { user2: useIdTo }] },
//         { $and: [{ user1: useIdTo }, { user2: userId }] },
//       ],
//     })
//     .sort({ updatedAt: -1 })
//     .exec()) as IConversation;
//   if (!conversations) {
//     throw new HttpException(400, 'Conversation id is not exist');
//   }
//   return conversations;
// }
