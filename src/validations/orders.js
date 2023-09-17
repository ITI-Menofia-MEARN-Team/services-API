import { check } from 'express-validator';
import validation from '../middlewares/validate.js';

export const getOrderValidator = [
  check('id').isMongoId().withMessage('رقم تعريفى غير صالح'),
  validation,
];

export const createOrderValidator = [
  check('user').isMongoId(),
  check('service').isMongoId(),
  check('extra_props').optional().isMongoId(),
  check('total_price')
    .notEmpty()
    .withMessage('اجمالي السعر مطلوب')
    .isNumeric()
    .withMessage('سعر غير صالح'),
  validation,
];

export const updateOrderValidator = [
  check('id').isMongoId().withMessage('رقم تعريفى غير صالح'),
  check('user').isMongoId().withMessage('اسم المستخدم مطلوب'),
  validation,
];

export const deleteOrderValidator = [
  check('id').isMongoId().withMessage('رقم تعريفى غير صالح'),
  validation,
];
