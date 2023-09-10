import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/user.js';
import ErrorApi from '../utils/errorAPI.js';

export const registerUser = asyncHandler(
  async (req, res, next) => {
    const { full_name, email, password, role } = req.body;

    const oldUser = await UserModel.findOne({
      email: email,
    });

    if (oldUser) {
      return next(new ErrorApi(`User already exists`, 404));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      full_name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    const token = await jwt.sign(
      {
        full_name: newUser.full_name,
        email: newUser.email,
        password,
        role: newUser.role,
      },
      process.env.TOKEN_KEY,
      { expiresIn: '3h' },
    );
    newUser.token = token;
    await newUser.save();
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  },
);

export const loginUser = asyncHandler(
  async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new ErrorApi(
          `Email and password are required `,
          404,
        ),
      );
    }

    const user = await UserModel.findOne({ email: email });
    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {
      // Create token
      const token = jwt.sign(
        { full_name, email, password },
        process.env.TOKEN_KEY,
        { expiresIn: '3h' },
      );
      user.token = token;
      res.status(201).json({
        status: 'success',
        data: {
          user: user,
        },
      });
    } else {
      return next(
        new ErrorApi(`Please check your input`, 404),
      );
    }
  },
);
