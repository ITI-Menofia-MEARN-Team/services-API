import express from 'express';
import UserModel from '../models/user.js';
import ErrorAPI from '../utils/errorAPI.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();
router.route('/').get(
  asyncHandler(async (req, res, next) => {
    const full_name = req.query.full_name;
    const searchQuery = req.query.q;

    const user = await UserModel.findOne({ full_name: full_name }).populate('services');

    if (!user) {
      return next(new ErrorAPI('لا يوجد مستخدم', 404));
    }
    if (user.role != 'Company') {
      return next(new ErrorAPI('لا يوجد مستخدم', 404));
    }
    const filterServices = user.services.filter((service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    console.log(user);
    console.log(filterServices);
    res.json({
      status: 'success',
      data: {
        services: filterServices,
      },
    });
  }),
);

export default router;
