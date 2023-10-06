import asyncHandler from 'express-async-handler';
import Service from '../models/service.js';
import UserModel from '../models/user.js';
import ErrorAPI from '../utils/errorAPI.js';
import jwt from 'jsonwebtoken';
import OrderModel from '../models/order.js';

export let handleSearch = asyncHandler(async (req, res, next) => {
  const searchQuery = req.query.search;
  const regexSearch = new RegExp(searchQuery, 'i');
  const companies = await UserModel.find({
    full_name: regexSearch,
    role: { $in: ['Admin', 'Company'] },
  }).select({
    full_name: 1,
  });
  const services = await Service.find({ title: regexSearch }).select({ title: 1 });
  if (!companies && !services) {
    return next(new ErrorAPI('لا يوجد مستخدم', 404));
  }

  res.json({
    status: 'success',
    data: {
      companies,
      services,
    },
  });
});

export const handlingSearchForCompany = asyncHandler(async (req, res, next) => {
  const searchQuery = req.query.search;
  const regexSearch = new RegExp(searchQuery, 'i');
  const token = req.headers['token'];
  const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  const companyId = decoded.id;
  const services = await Service.find({
    title: regexSearch,
    company: companyId,
  }).select({
    title: 1,
  });
  //   Search orders by user
  // const orders = await OrderModel.find({ 'user.full_name': regexSearch }).select({
  //   'user.full_name': 1,
  // });

  // if (!orders) {
  //   return next(new ErrorAPI('لا يوجد طلبات', 404));
  // }
  if (!services) {
    return next(new ErrorAPI('لا يوجد خدمات', 404));
  }

  res.json({
    status: 'success',
    data: {
      // orders,
      services,
    },
  });
});
