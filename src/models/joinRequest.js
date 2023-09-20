import mongoose from 'mongoose';

const joinSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, 'الاسم بالكامل مطلوب '],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'البريد الالكتروني مطلوب'],
      unique: [true, 'البريد الالكتروني مسجل بالفعل '],
      trim: true,
    },
    username: {
      type: String,
      unique: [true, 'اسم المستخدم مسجل بالفعل'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'كلمة المرور مطلوية '],
    },
    phone_number: {
      type: String,
      trim: true,
    },
    picture: {
      type: String,
      default: 'uploads/user/profie.jpg',
    },
    role: {
      type: String,
      default: 'Company',
    },
    social_links: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      youtube: { type: String },
    },
  },
  {
    timestamps: true,
  },
);

const JoinModel = mongoose.model('JoinRequest', joinSchema);

export default JoinModel;
