import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/user.js';
import ErrorApi from '../utils/errorAPI.js';

const oneDay = 1000 * 60 * 60 * 24;

export const registerUser = asyncHandler(async (req, res, next) => {
  const { full_name, email, password, username, phoneNumber } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await UserModel.create({
    full_name,
    email: email.toLowerCase(),
    password: hashedPassword,
    username,
    phoneNumber,
  });

  console.log(user);

  const token = jwt.sign(
    {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    process.env.TOKEN_KEY,
    { expiresIn: '3h' },
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
          picture: user.picture,
        },
        token,
      },
    });
});

export const loginUser = asyncHandler(async (req, res, next) => {
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
            picture: user.picture,
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
            picture: user.picture,
          },
          token,
        },
      });
  } else {
    return next(new ErrorApi(`اسم المستخدم او كلمة المرور غير صحيح`, 400));
  }
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', '', { maxAge: '1' });
});
