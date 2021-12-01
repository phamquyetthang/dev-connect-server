import bcrypt from 'bcrypt';
import { IEditUserBasicReq, IEditUserProfileReq } from './../interfaces';
import userPreferencesModel from '../../../models/user/preferences/model';
import { IEditSnippetReq, IChangePasswordReq } from '../interfaces';
import userModel from '../../../models/user/account/model';
import HttpException from '../../../common/helpers/HttpException';
import userProfileModel from '../../../models/user/profile/model';

export async function editUserBasicInfoService(
  userId: string,
  data: IEditUserBasicReq
) {
  const info = await userModel
    .findByIdAndUpdate(
      userId,
      {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      },
      { new: true }
    )
    .select('-password');
  return info;
}

export async function editUserProfileService(
  userId: string,
  data: IEditUserProfileReq
) {
  const profile = await userProfileModel
    .findOneAndUpdate(
      { user: userId },
      {
        ...data,
      },
      { new: true }
    )
    .populate('user', 'first_name last_name email')
    .select('company website location status skills bio -_id');
  return profile;
}

export async function editPasswordService(
  userId: string,
  { oldPassWord, newPassWord }: IChangePasswordReq
) {
  const user = await userModel.findById(userId).then(async (res) => {
    const isMatchPass = await bcrypt.compare(oldPassWord, res?.password || '');
    if (!isMatchPass) {
      throw new HttpException(401, 'Your old password was wrong!');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassWord, salt);
    res
      ?.updateOne({ password: hashedPassword }, { new: true })
      .select('-password');
    return res;
  });

  return {
    success: !!user,
  };
}

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
    const preference = await userPreferencesModel.findOne(
      {
        $and: [
          {
            userId: userId,
          },
          {
            snippets: { $elemMatch: { _id: snippetId } },
          },
        ],
      },
      { new: true }
    );
    return preference;
  } catch (error) {
    throw error;
  }
}
