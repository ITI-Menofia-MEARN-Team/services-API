const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');
const OrderModel = require('../models/order.js');
const ErrorApi = require('../utils/errorAPI.js');

const getAllOrders = asyncHandler(async (req, res) => {
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
const AddOrder = asyncHandler(async (req, res, next) => {
  try {
    // Create a new order
    const newOrder = await OrderModel.create(req.body);
    const orderMail = newOrder.populate();

    // Configure Nodemailer with Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'tt8967056@gmail.com',
        pass: 'ywaq owod krhu sjox', // Replace with your Gmail App Password
      },
    });

    // Compose and send the email
    const info = await transporter.sendMail({
      from: 'tt8967056@gmail.com', // Sender's Gmail address
      to: 'abdelrhmanmohamed421@gmail.com', // Recipient's email address
      subject: 'New Order',
      text: `A new order has been placed:\n\n${JSON.stringify(orderMail, null, 2)}`,
      html: `<p>A new order has been placed:</p><pre>${JSON.stringify(orderMail, null, 2)}</pre>`,
    });

    // Respond with a success status and the newly created order
    res.status(201).json({
      status: 'success',
      data: {
        order: newOrder,
      },
    });
  } catch (error) {
    // Handle errors appropriately, e.g., log the error and respond with an error status
    console.error('Error creating order and sending email:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

const getOrder = asyncHandler(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id)
    .populate({
      path: 'user',
      select: '-password',
    })
    .populate({
      path: 'company',
      select: '-password',
    })
    .populate('service')
    .populate('extra_props');
  if (order) {
    res.json(order);
  } else {
    return next(new ErrorApi(`لا يوجد طلب بهذا الرقم  ${req.params.id}`, 404));
  }
});

const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await OrderModel.findByIdAndRemove(req.params.id);
  if (!order) {
    return next(new ErrorApi(`لا يوجد طلب بهذا الرقم ${req.params.id}`, 404));
  } else {
    res.json({
      message: 'تم حذف الطلب بنجاح',
    });
  }
});

const updateOrder = asyncHandler(async (req, res, next) => {
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

const getCompanyOrders = asyncHandler(async (req, res) => {
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

module.exports = { getAllOrders, getOrder, updateOrder, deleteOrder, getCompanyOrders, AddOrder };
