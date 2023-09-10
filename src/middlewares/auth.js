import { jwt } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import ErrorApi from '../utils/errorAPI.js';

export const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return next(new ErrorApi(`User already exists`, 404));
  }
  try {
    const decoded = await jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return next(new ErrorApi(`Invalid Token`, 404));
  }

  return next();
});

export default verifyToken;
