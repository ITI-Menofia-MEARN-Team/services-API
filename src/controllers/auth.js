import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/user.js';
import ErrorApi from '../utils/errorAPI.js';

const oneDay = 1000 * 60 * 60 * 24;

export const registerUser = asyncHandler(async (req, res, next) => {
  const { full_name, email, password, username } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = await UserModel.create({
    full_name,
    email: email.toLowerCase(),
    password: hashedPassword,
    username,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
      full_name: newUser.full_name,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
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
        user: newUser,
        token,
      },
    });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, full_name } = req.body;
  if (!email && !username) {
    return next(new ErrorApi(`Email or username is required `, 400));
  }

  const match = email ? { email: email.toLowerCase() } : { username };

  const user = await UserModel.findOne(match);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ full_name, email, password }, process.env.TOKEN_KEY, {
      expiresIn: '3h',
    });

    res
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: oneDay,
      })
      .status(201)
      .json({
        status: 'success',
        data: {
          user: user,
          token,
        },
      });
  } else {
    return next(new ErrorApi(`Username or password is invalid`, 400));
  }
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', '', { maxAge: '1' });
});
