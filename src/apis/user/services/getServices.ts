import HttpException from '../../../common/helpers/HttpException';
import userModel from '../../../models/user/account/model';
import userPreferencesModel from '../../../models/user/preferences/model';
import userProfileModel from '../../../models/user/profile/model';

export const getInfoService = async (id: string) => {
  const user = await userModel.findById(id).select('-password');
  if (!user) {
    throw new HttpException(400, 'Account is not exit');
  }
  return user;
};

export const getUserProfileService = async (userId: string) => {
  const profile = await userProfileModel
    .findOne({ user: userId })
    .populate('user', 'first_name last_name email')
    .select('company website location status skills bio -_id')
    .exec();

  if (!profile) {

    let newProfile = await userProfileModel.create({ user: userId });
    newProfile = await newProfile
      .populate('user', 'first_name last_name email')
      .execPopulate();
    return newProfile;
  }
  
  return profile;
};

export const getPreferencesService = async (userId: string) => {
  const preferences = await userPreferencesModel
    .findOne({ userId })
    .select('-_id')
    .exec();
  if (!preferences) {
    const { _id, ...newPreferences } = await userPreferencesModel.create({
      userId,
      snippets: [
        {
          name: 'js axios',
          template: `
axios.'$method'('$url', {
  '$req'
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
})
.then(function () {
  // always executed
});  
        `,
          isDefault: true,
        },
      ],
    });

    return newPreferences;
  }
  return preferences;
};
