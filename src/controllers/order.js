import asyncHandler from 'express-async-handler';
import OrderModel from '../models/order.js';
import ErrorApi from '../utils/errorAPI.js';

export const getAllOrders = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  const orders = await OrderModel.find({}).skip(skip).limit(limit);
  res.status(200).json({
    status: 'success',
    result: orders.length,
    data: {
      orders,
    },
  });
});

export const AddOrder = asyncHandler(async (req, res) => {
  //create order
  const newOrder = await OrderModel.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      order: newOrder,
    },
  });
});

export const getOrder = asyncHandler(async (req, res, next) => {
  const order = await order.findById(req.params.id);
  if (order) {
    res.json(order);
  } else {
    return next(new ErrorApi(`No order for this id ${id}`, 404));
  }
});

export const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await OrderModel.findByIdAndRemove(req.params.id);
  if (!order) {
    return next(new ErrorApi(`No order for this id ${id}`, 404));
  } else {
    res.json({ message: 'order deleted successfully' });
  }
});

export const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await OrderModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true, runValidators: true },
  );
  if (!order) {
    return next(new ErrorApi(`No order for this id ${id}`, 404));
  } else {
    res.json(order);
  }
});
