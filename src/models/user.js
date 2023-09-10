import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, 'full_name is required'],
      trim: true,
    },
    username: {
      type: String,
      unique: [true, 'username is already taken'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: [true, 'email is already taken'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    phone_number: {
      type: String,
      trim: true,
    },
    picture: {
      type: String,
    },
    role: {
      type: String,
      enum: ['Admin', 'User', 'Company'],
      default: 'User',
    },
    received_orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    requested_orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
