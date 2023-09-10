import { check } from 'express-validator';
import validation from '../middlewares/validate.js';

export const getOrderValidator = [
  check('id').isMongoId().withMessage('Invalid Order id format'),
  validation,
];

export const createOrderValidator = [
  check('user').isMongoId(),
  check('service').isMongoId(),
  check('extra_props').isMongoId(),
  validation,
];

export const updateOrderValidator = [
  check('id').isMongoId().withMessage('Invalid Order id format'),
  check('user').isMongoId().withMessage('User is required'),
  validation,
];

export const deleteOrderValidator = [
  check('id').isMongoId().withMessage('Invalid Order id format'),
  validation,
];
