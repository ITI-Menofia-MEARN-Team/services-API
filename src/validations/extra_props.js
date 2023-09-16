import { check } from 'express-validator';
import validation from '../middleware/validate.js';
export const getPropsValidator = [
  check('id').isMongoId().withMessage('رقم تعريف غير صالح'),
  validation,
];

export const createPropsValidator = [
  check('price').notEmpty().withMessage('السعر مطلوب'),
  check('description')
    .notEmpty()
    .withMessage('الوصف مطلوب')
    .isLength({ max: 32, min: 3 })
    .withMessage('يجب أن يتراوح طول مدخل الوصف بين 3 و32 حرفًا'),
  validation,
];

export const updatePropsValidator = [
  check('id').isMongoId().withMessage('رقم تعريف غير صالح'),
  check('price').notEmpty().withMessage('السعر مطلوب '),
  check('description')
    .notEmpty()
    .withMessage('الوصف مطلوب')
    .isLength({ max: 32, min: 3 })
    .withMessage('يجب أن يتراوح طول مدخل الوصف بين 3 و32 حرفًا'),
  validation,
];

export const deletePropsValidator = [
  check('id').isMongoId().withMessage('رقم تعريف غير صالح'),
  validation,
];
