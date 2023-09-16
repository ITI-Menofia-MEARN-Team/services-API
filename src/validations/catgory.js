import { check } from 'express-validator';
import validation from '../middleware/validate.js';
export const getCategoryValidator = [
  check('id').isMongoId().withMessage('رقم تعريف غير صالح'),
  validation,
];

export const createCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('اسم الفئة مطلوب')
    .isLength({ max: 32, min: 3 })
    .withMessage('يجب أن يتراوح طول اسم الفئة من 3 إلى 32 حرفًا'),
  check('service').isMongoId(),
  validation,
];

export const updateCategoryValidator = [
  check('id').isMongoId().withMessage('رقم تعريف غير صالح'),
  check('name')
    .notEmpty()
    .withMessage('اسم الفئة مطلوب')
    .isLength({ max: 32, min: 3 })
    .withMessage('يجب أن يتراوح طول اسم الفئة من 3 إلى 32 حرفًا'),
  check('service').isMongoId().withMessage('Service ID is required'),
  validation,
];

export const deleteCategoryValidator = [
  check('id').isMongoId().withMessage('رقم تعريف غير صالح'),
  validation,
];
