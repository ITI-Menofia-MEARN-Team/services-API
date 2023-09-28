import asyncHandler from 'express-async-handler';

import Service from '../models/service.js';
import UserModel from '../models/user.js';
import ErrorAPI from '../utils/errorAPI.js';

export let handleSearch = asyncHandler(async (req, res, next) => {
  const searchQuery = req.query.search;
  const regexSearch = new RegExp(searchQuery, 'i');
  const companies = await UserModel.find({ full_name: regexSearch, role: 'Company' }).select({
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
