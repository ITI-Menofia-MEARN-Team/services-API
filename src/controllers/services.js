import asyncHandler from 'express-async-handler';
import Service from '../models/service.js';
import ErrorAPI from '../utils/errorAPI.js';

const addNewService = asyncHandler(async (req, res) => {
  const newService = await Service.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      service: newService,
    },
  });
});

const getAllServices = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  const services = await Service.find({})
    .populate('category')
    .populate({
      path: 'company',
      select: 'full_name -_id',
    })
    .skip(skip)
    .limit(limit);
  res.status(200).json({
    status: 'success',
    result: services.length,
    data: {
      services,
    },
  });
});

const getService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)
    .populate({
      path: 'company',
      select: '-password -_id',
    })
    .populate('category');
  if (!service) {
    return next(new ErrorAPI(`لا يوجد خدمة مسجلة بهذا الرقم ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      service,
    },
  });
});

const updateService = asyncHandler(async (req, res, next) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    return next(new ErrorAPI(`لا يوجد خدمة مسجلة بهذا الرقم  ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      service,
    },
  });
});

const deleteService = asyncHandler(async (req, res, next) => {
  const service = await Service.findByIdAndRemove(req.params.id);
  if (!service) {
    return next(new ErrorAPI(`لا يوجد خدمة مسجله بهذا الرقم  ${req.params.id}`, 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Bonus
const getCompanyServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ company: req.params.id });
  if (!services) {
    return next(new ErrorAPI(`لا يوجد خدمة مسجلة لهذه الشركة  ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      services,
    },
  });
});

export {
  addNewService,
  getAllServices,
  getService,
  updateService,
  deleteService,
  getCompanyServices,
};
