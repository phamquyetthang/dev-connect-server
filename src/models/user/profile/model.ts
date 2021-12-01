import mongoose from 'mongoose';
import IProfile from './interface';
const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accounts',
  },
  company: {
    type: String,
    default: '',
  },
  website: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: '',
  },
  skills: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  experience: [
    {
      title: {
        type: String,
      },
      company: {
        type: String,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
      },
      degree: {
        type: String,
      },
      fieldOfStudy: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    zalo: {
      type: String,
    },
  },
});

const userProfileModel = mongoose.model<IProfile & mongoose.Document>(
  'Profiles',
  profileSchema
);

export default userProfileModel;
