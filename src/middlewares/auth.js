import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import ErrorApi from '../utils/errorAPI.js';
import Service from '../models/service.js';
import OrderModel from '../models/order.js';

export const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.headers['token'];
  if (!token) {
    return next(new ErrorApi(`You have to login first `, 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.currentUser = decoded;
  } catch (err) {
    return next(new ErrorApi(`Invalid Token`, 401));
  }
  return next();
});

export const isAllowed =
  (...roles) =>
  (req, res, next) => {
    if (roles.includes(req.currentUser.role)) {
      next();
    } else return next(new ErrorApi('You are not authorized!'));
  };

export const isMine = asyncHandler(async (req, res, next) => {
  if (req.currentUser.role === 'Admin') next();
  else if (req.params.id === req.currentUser.id) return next();
  else return next(new ErrorApi('You are not authorized!'));
});

export const isTheSameCompany = asyncHandler(async (req, res, next) => {
  if (req.currentUser.role === 'Admin') return next();
  else if (req.body.company === req.currentUser.id) return next();
  else return next(new ErrorApi('You are not authorized!'));
});
export const isMyService = asyncHandler(async (req, res, next) => {
  if (req.currentUser.role === 'Admin') return next();

  const service = await Service.findById(req.params.id);
  const companyId = service.company;

  if (companyId.toString() === req.currentUser.id) return next();
  else return next(new ErrorApi('You are not authorized!'));
});

export const isOrderAllowed = asyncHandler(async (req, res, next) => {
  if (req.currentUser.role === 'Admin') return next();
  const order = await OrderModel.findById(req.params.id);
  const userId = order.user;
  console.log(`userId: ${typeof userId.toString()}`);
  console.log(`req.currentUser.id: ${typeof req.currentUser.id}`);
  if (req.currentUser.id === userId.toString()) {
    console.log(`elzohery a5oyaaaaaaaa`);
    return next();
  } else return next(new ErrorApi('You are not authorized!'));
});
