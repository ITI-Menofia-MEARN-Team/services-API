import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/user.js';
import ErrorApi from '../utils/errorAPI.js';
import { uploadMixOfImages } from '../middlewares/uploadImage.js';

const oneDay = 1000 * 60 * 60 * 24;
const uploadUserImage = uploadMixOfImages('image', 1, 'src/uploads/user', 'user');

const saveImgInDB = (req, res, next) => {
  const uploadedFiles = req.files;
  if (uploadedFiles && uploadedFiles.length > 0) {
    req.body.image = uploadedFiles.map((file) => file.filename);
  } else {
    // If no images were uploaded, assign a default image filename to req.body.images
    req.body.image = ['uploads/user/profie.jpg'];
  }
  next();
};
const registerUser = asyncHandler(async (req, res, next) => {
  const { full_name, email, password, username, phoneNumber, image } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await UserModel.create({
    full_name,
    email: email.toLowerCase(),
    password: hashedPassword,
    username,
    phoneNumber,
    image,
  });
  const token = jwt.sign(
    {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    process.env.TOKEN_KEY,
  );

  res
    .cookie('jwt', token, {
      httpOnly: true,
      maxAge: oneDay,
    })
    .status(201)
    .json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          full_name: user.full_name,
          email: user.email,
          username: user.username,
          role: user.role,
          image: user.image,
        },
        token,
      },
    });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!email && !username) {
    return next(new ErrorApi(` البريد الإلكتروني و اسم المستخدم مطلوب`, 400));
  }

  const match = email ? { email: email.toLowerCase() } : { username };

  const user = await UserModel.findOne(match);
  if (user.role === 'Admin' && user.password === password) {
    const token = jwt.sign(
      {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '3h',
      },
    );
    res
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: oneDay,
      })
      .status(201)
      .json({
        status: 'success',
        data: {
          user: {
            id: user._id,
            full_name: user.full_name,
            email: user.email,
            username: user.username,
            role: user.role,
            image: user.image,
          },
          token,
        },
      });
  } else if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.TOKEN_KEY,
    );

    res
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: oneDay,
      })
      .status(201)
      .json({
        status: 'success',
        data: {
          user: {
            id: user._id,
            full_name: user.full_name,
            email: user.email,
            username: user.username,
            role: user.role,
            image: user.image,
          },
          token,
        },
      });
  } else {
    return next(new ErrorApi(`اسم المستخدم او كلمة المرور غير صحيح`, 400));
  }
});

const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', '', { maxAge: '1' });
});

export { registerUser, loginUser, logoutUser, uploadUserImage, saveImgInDB };
