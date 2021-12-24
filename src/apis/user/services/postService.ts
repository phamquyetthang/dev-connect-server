import userPreferencesModel from '../../../models/user/preferences/model';
import { IAddSnippetReq } from '../interfaces';

export async function addSnippetService({ userId, snippet }: IAddSnippetReq) {
  const preference = await userPreferencesModel.findOneAndUpdate(
    {
      userId: userId,
    },
    {
      $push: {
        snippets: { ...snippet },
      },
    },
    {
      new: true,
    }
  );
  return preference;
}
