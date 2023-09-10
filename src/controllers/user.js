import asyncHandler from 'express-async-handler';
import UserModel from '../models/user.js';
import ErrorApi from '../utils/errorAPI.js';

export const getAllUsers = asyncHandler(
  async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    const users = await UserModel.find({})
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  },
);

export const AddUser = asyncHandler(async (req, res) => {
  const newUser = await UserModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

export const getUser = asyncHandler(
  async (req, res, next) => {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      return next(
        new ErrorApi(`No User for this id ${id}`, 404),
      );
    }
  },
);

export const deleteUser = asyncHandler(
  async (req, res, next) => {
    const user = await UserModel.findByIdAndRemove(
      req.params.id,
    );
    if (!user) {
      return next(
        new ErrorApi(`No User for this id ${id}`, 404),
      );
    } else {
      res.json({
        message: 'User deleted successfully',
      });
    }
  },
);

export const updateUser = asyncHandler(
  async (req, res, next) => {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      return next(
        new ErrorApi(`No User for this id ${id}`, 404),
      );
    } else {
      res.json(user);
    }
  },
);
