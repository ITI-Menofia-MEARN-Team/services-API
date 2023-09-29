import asyncHandler from 'express-async-handler';

import UserModel from '../models/user.js';

export const removeUsernameAndEmail = asyncHandler(async (req, res, next) => {
  // Remove username and email from req.body

  const userId = req.params['id'];
  const user = await UserModel.findById(userId);
  if (user.username === req.body.username) delete req.body.username;
  if (user.email === req.body.email) delete req.body.email;

  next();
});
