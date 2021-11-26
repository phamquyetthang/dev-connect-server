import { ISnippet } from '../../../models/user/preferences/interface';
import userPreferencesModel from '../../../models/user/preferences/model';
import { IEditSnippetReq } from '../interfaces';

export async function changeThemeService(userId: string, theme: string) {
  try {
    const preference = await userPreferencesModel.findOneAndUpdate(
      { userId: userId },
      { theme: theme },
      { new: true }
    );
    return preference;
  } catch (error) {
    throw error;
  }
}

export async function changeLanguageService(userId: string, language: string) {
  try {
    const preference = await userPreferencesModel.findOneAndUpdate(
      { userId: userId },
      { language: language },
      { new: true }
    );
    return preference;
  } catch (error) {
    throw error;
  }
}

export async function editSnippetService({
  userId,
  snippetId,
}: IEditSnippetReq) {
  try {
    const preference = await userPreferencesModel.findOne({
      $and: [
        {
          userId: userId,
        },
        {
          snippets: { $elemMatch: { _id: snippetId } },
        },
      ],
    });
    return preference;
  } catch (error) {
    throw error;
  }
}
