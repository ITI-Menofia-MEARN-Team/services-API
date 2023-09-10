import { validationResult } from 'express-validator';

// @desc Middleware for validate the routes
const validation = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });
  next();
};

export default validation;
