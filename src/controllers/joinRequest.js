import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import ErrorApi from '../utils/errorAPI.js';
import JoinModel from '../models/joinRequest.js';
import { uploadingSingleImage } from '../middlewares/uploadImage.js';

const uploadUserImage = uploadingSingleImage('picture', 'src/uploads/user', 'user');

const saveImgInDB = (req, res, next) => {
  const userPic = req.file;
  req.body.picture = userPic.filename;
  next();
};

const getAllRequests = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  const joinRequests = await JoinModel.find({}).skip(skip).limit(limit);
  res.status(200).json({
    status: 'success',
    result: joinRequests.length,
    data: {
      joinRequests,
    },
  });
});

const addRequest = asyncHandler(async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  const RequestObject = {
    ...req.body,
    password: hashedPassword,
  };
  const newRequest = await JoinModel.create(RequestObject);
  res.status(201).json({
    status: 'success',
    data: {
      joinRequest: newRequest,
    },
  });
});

const getRequest = asyncHandler(async (req, res, next) => {
  const joinRequest = await JoinModel.findById(req.params.id);
  if (joinRequest) {
    res.json(joinRequest);
  } else {
    return next(new ErrorApi(`لا يوجد طلب انضمام مسجل${req.params.id}`, 404));
  }
});

const deleteRequest = asyncHandler(async (req, res, next) => {
  const joinRequest = await JoinModel.findByIdAndRemove(req.params.id);
  if (!joinRequest) {
    return next(new ErrorApi(`لا يوجد طلب انضمام مسجل  ${req.params.id}`, 404));
  } else {
    res.json({
      message: 'تم حذف الطلب بنجاح',
    });
  }
});

const updateRequest = asyncHandler(async (req, res, next) => {
  const joinRequest = await JoinModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!joinRequest) {
    return next(new ErrorApi(`لا يوجد طلب انضمام مسجل  ${req.params.id}`, 404));
  } else {
    res.json(joinRequest);
  }
});

export {
  addRequest,
  getRequest,
  getAllRequests,
  updateRequest,
  deleteRequest,
  uploadUserImage,
  saveImgInDB,
};