import asyncHandler from 'express-async-handler';
import ExtraPropModel from '../models/extraProp.js';
import ErrorApi from '../utils/errorAPI.js';

export const getAllExtraProps = asyncHandler(
  async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    const extraProps = await ExtraPropModel.find({})
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      status: 'success',
      result: extraProps.length,
      data: {
        extraProps,
      },
    });
  },
);

export const AddExtraProp = asyncHandler(
  async (req, res) => {
    //create ExtraProp
    const newExtraProp = await ExtraPropModel.create(
      req.body,
    );
    res.status(201).json({
      status: 'success',
      data: {
        extraProp: newExtraProp,
      },
    });
  },
);

export const getExtraProp = asyncHandler(
  async (req, res, next) => {
    const extraProp = await ExtraPropModel.findById(
      req.params.id,
    );
    if (extraProp) {
      res.json(extraProp);
    } else {
      return next(
        new ErrorApi(`No extraProp for this id ${id}`, 404),
      );
    }
  },
);

export const deleteExtraProp = asyncHandler(
  async (req, res, next) => {
    const extraProp =
      await ExtraPropModel.findByIdAndRemove(req.params.id);
    if (!extraProp) {
      return next(
        new ErrorApi(`No extraProp for this id ${id}`, 404),
      );
    } else {
      res.json({
        message: 'extraProp deleted successfully',
      });
    }
  },
);

export const updateExtraProp = asyncHandler(
  async (req, res, next) => {
    const extraProp =
      await ExtraPropModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        {
          new: true,
          runValidators: true,
        },
      );
    if (!extraProp) {
      return next(
        new ErrorApi(`No extraProp for this id ${id}`, 404),
      );
    } else {
      res.json(extraProp);
    }
  },
);
