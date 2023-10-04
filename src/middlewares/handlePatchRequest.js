import asyncHandler from 'express-async-handler';

import UserModel from '../models/user.js';
import Service from '../models/service.js';
import ExtraPropModel from '../models/extraProp.js';

export const removeUsernameAndEmail = asyncHandler(async (req, res, next) => {
  // Remove username and email from req.body

  const userId = req.params['id'];
  const user = await UserModel.findById(userId);
  if (user.username === req.body.username) delete req.body.username;
  if (user.email === req.body.email) delete req.body.email;

  next();
});

export const deleteExtraProps = asyncHandler(async (req, res, next) => {
  const currentService = await Service.findById(req.params.id);

  const extraPropsArray = currentService.extra_props;
  extraPropsArray.forEach(
    asyncHandler(async (extraProp) => {
      await ExtraPropModel.findByIdAndDelete(extraProp);
    }),
  );
  next();
});
