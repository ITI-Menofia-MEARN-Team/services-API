import asyncHandler from 'express-async-handler';

import Service from '../models/service.js';
import UserModel from '../models/user.js';
import ErrorAPI from '../utils/errorAPI.js';

export let handleSearch = asyncHandler(async (req, res, next) => {
  const searchQuery = req.query.search;
  const regexSearch = new RegExp(searchQuery, 'i');
  const users = await UserModel.find({ full_name: regexSearch, role: 'Company' });
  const services = await Service.find({ title: regexSearch });
  if (!users && !services) {
    return next(new ErrorAPI('لا يوجد مستخدم', 404));
  }

  res.json({
    status: 'success',
    data: {
      users: users,
      services: services,
    },
  });
});
