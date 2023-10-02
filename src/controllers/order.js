import asyncHandler from 'express-async-handler';
import OrderModel from '../models/order.js';
import ErrorApi from '../utils/errorAPI.js';

export const getAllOrders = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  const orders = await OrderModel.find({})
    .populate({ path: 'user', select: 'full_name -_id' })
    .populate({
      path: 'company',
      select: 'full_name -_id',
    })
    .populate({ path: 'service', select: 'title -_id' })
    .populate({
      path: 'extra_props',
      select: 'description -_id',
    })
    .skip(skip)
    .limit(limit);
  res.status(200).json({
    status: 'success',
    result: orders.length,
    data: {
      orders,
    },
  });
});

export const AddOrder = asyncHandler(async (req, res, next) => {
  const newOrder = await OrderModel.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      order: newOrder,
    },
  });
});

export const getOrder = asyncHandler(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id)
    .populate('user')
    .populate('company')
    .populate('service')
    .populate('extra_props');
  if (order) {
    res.json(order);
  } else {
    return next(new ErrorApi(`لا يوجد طلب بهذا الرقم  ${req.params.id}`, 404));
  }
});

export const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await OrderModel.findByIdAndRemove(req.params.id);
  if (!order) {
    return next(new ErrorApi(`لا يوجد طلب بهذا الرقم ${req.params.id}`, 404));
  } else {
    res.json({
      message: 'تم حذف الطلب بنجاح',
    });
  }
});

export const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await OrderModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!order) {
    return next(new ErrorApi(`لا يوجد طلب بهذا الرقم  ${req.params.id}`, 404));
  } else {
    res.json(order);
  }
});

export const getCompanyOrders = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  const orders = await OrderModel.find({ company: req.params.id })
    .populate({ path: 'user', select: '-password -_id' })
    .populate({
      path: 'company',
      select: '-password -_id',
    })
    .populate('service')
    .populate('extra_props')
    .skip(skip)
    .limit(limit);
  res.status(200).json({
    status: 'success',
    result: orders.length,
    data: {
      orders,
    },
  });
});
