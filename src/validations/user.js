import { check } from 'express-validator';
import validation from '../middlewares/validate.js';
import UserModel from '../models/user.js';

export const addUserValidator = [
  check('full_name')
    .trim()
    .notEmpty()
    .withMessage('الاسم الكامل مطلوب')
    .isString()
    .withMessage('الاسم لا بد ان يتكون من احرف فقط'),
  check('username')
    .trim()
    .notEmpty()
    .withMessage('اسم السمتخدم مطلوب')
    .isString()
    .withMessage('لابد ان يتكون اسم المستخدم مناحرف فقط')
    .custom((value) => {
      return UserModel.find({ username: value }).then((username) => {
        if (username.length > 0) {
          throw 'اسم السمتخدم مسجل بالفعل';
        }
      });
    }),
  check('email')
    .notEmpty()
    .withMessage('البريد الالكترونى مطلوب')
    .isEmail()
    .withMessage('بريد الكترونى غير صالح')
    .normalizeEmail()
    .custom((value) => {
      return UserModel.find({ email: value }).then((mail) => {
        if (mail.length > 0) {
          throw 'البريد الالكترونى مسجل بالفعل';
        }
      });
    }),
  check('password')
    .notEmpty()
    .withMessage('كلمة المرور مطلوبة')
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minLength: 8,
      minSymbols: 0,
    })
    .withMessage(
      'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل، مع حرف صغير وحرف كبير ورقم واحد على الأقل',
    ),
  check('phone_number').optional().isMobilePhone().withMessage('رقم هاتف غير صالح'),
  check('image')
    .optional()
    .isArray()
    .custom((value) => {
      if (!value.every((item) => typeof item === 'string')) {
        throw new Error('لابد ان يكون اسم الصور مكون من احرف فقط');
      }
      return true;
    }),
  check('role').default('User'),
  check('received_orders').optional().isMongoId().withMessage('طلب غير صالح'),
  check('requested_orders').optional().isMongoId().withMessage('طلب غير صالح'),
  check('services').optional().isMongoId().withMessage('خدمة غير صالحة'),
  validation,
];

export const getUserValidator = [
  check('id').isMongoId().withMessage('رقم المستخدم غير صالح'),
  validation,
];

export const deleteUserValidator = [
  check('id').isMongoId().withMessage('رقم مستخدم غير صالح'),
  validation,
];

export const updateUserValidator = [
  check('id').isMongoId().withMessage('رقم مستخدم غير صالح'),
  check('full_name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('الاسم الكامل مطلوب')
    .isString()
    .withMessage('لابد ان يتكون الاسم من حروف فقط'),
  check('username')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('اسم المستخدم مطلوب')
    .isString()
    .withMessage('لابد ان اسم المستخدم ان يتكون من احرف فقط')
    .custom((value) => {
      return UserModel.find({ username: value }).then((username) => {
        if (username.length > 0) {
          throw 'اسم المستخدم مسجل بالفعل';
        }
      });
    }),
  check('email')
    .optional()
    .notEmpty()
    .withMessage('البريد الالكترونى مسجل بالفعل ')
    .isEmail()
    .withMessage('بريد الكترونى غير صالح')
    .normalizeEmail()
    .custom((value) => {
      return UserModel.find({ email: value }).then((mail) => {
        if (mail.length > 0) {
          throw 'البريد الالكترونى مسجل بالفعل';
        }
      });
    }),
  check('password')
    .optional()
    .notEmpty()
    .withMessage('كلمة المرور مطلوبة ')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل، مع حرف صغير وحرف كبير ورقم واحد على الأقل',
    ),
  check('phone_number').optional().isMobilePhone().withMessage('رقم هاتف غير صالح'),
  check('image')
    .optional()
    .isArray()
    .custom((value) => {
      if (!value.every((item) => typeof item === 'string')) {
        throw new Error('لابد ان يكون اسم الصور مكون من احرف فقط');
      }
      return true;
    }),
  check('received_orders').optional().isMongoId().withMessage('طلب غير صالح'),
  check('requested_orders').optional().isMongoId().withMessage('طلب غير صالح'),
  check('services').optional().isMongoId().withMessage('خدمة غير صالحة'),
  validation,
];

// Auth
export const loginUserValidator = [
  check('username')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('اسم المستخدم مطلوب')
    .isString()
    .withMessage('لابد ان يتكون اسم المستخدم من احرف فقط')
    .custom((value) => {
      return UserModel.find({ username: value }).then((username) => {
        if (username.length === 0) {
          throw 'اسم السمتخدم مسجل بالفعل';
        }
      });
    }),
  check('email')
    .optional()
    .notEmpty()
    .withMessage('البريد الالكترونى مسجل بالفعل ')
    .isEmail()
    .withMessage('بريد الكترونى غير صالح')
    .normalizeEmail()
    .custom((value) => {
      return UserModel.find({ email: value }).then((email) => {
        if (email.length === 0) {
          throw 'البريد الالكترونى غير مسجل';
        }
      });
    }),
  check('password').notEmpty().withMessage('كلمة المرور مطلوبة '),

  validation,
];
