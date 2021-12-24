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
      members: [],
    });
    await newConversation.save();
    return newConversation;
  } else {
    const members = request.member?.includes(userId)
      ? request.member
      : [userId, ...request.member];
      
    const newConversation = new conversationModel({
      name: groupName,
      projectId: request.projectId,
      admin: [userId],
      members: members,
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
  const conversation = await conversationModel
    .findByIdAndUpdate(
      request.conversationId,
      {
        $push: {
          messages: {
            $each: [{ text: request.text, from: userId }],
            $position: 0,
          },
        },
      },
      { new: true }
    )
    .populate('messages.from', '_id first_name last_name');
  return conversation;
}

export async function createChatDocService(userId: string, docId: string) {
  const doc = await docModel
    .findById(docId)
    .select('title members projectId')
    .exec();
  const members = doc?.members.map((i) => i.id_member) || [];
  console.log(
    '🚀 ~ file: postService.ts ~ line 60 ~ createChatDocService ~ members',
    members
  );
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
