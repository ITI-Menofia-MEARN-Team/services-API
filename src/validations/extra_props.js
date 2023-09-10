import { check } from 'express-validator';
import validation from '../middleware/validate.js';
export const getPropsValidator = [
  check('id').isMongoId().withMessage('Invalid Props id format'),
  validation,
];

export const createPropsValidator = [
  check('price').notEmpty().withMessage('Props price is required'),
  check('description')
    .notEmpty()
    .withMessage('Props description is required')
    .isLength({ max: 32, min: 3 })
    .withMessage('Props description length must be 3-32 chars'),
  validation,
];

export const updatePropsValidator = [
  check('id').isMongoId().withMessage('Invalid Props id format'),
  check('price').notEmpty().withMessage('Props price is required'),
  check('description')
    .notEmpty()
    .withMessage('Props description is required')
    .isLength({ max: 32, min: 3 })
    .withMessage('Props description length must be 3-32 chars'),
  validation,
];

export const deletePropsValidator = [
  check('id').isMongoId().withMessage('Invalid Props id format'),
  validation,
];
