import { check } from 'express-validator';
import validation from '../middlewares/validate.js';
import UserModel from '../models/user.js';

export const addUserValidator = [
  check('full_name')
    .trim()
    .notEmpty()
    .withMessage('full name is required')
    .isString()
    .withMessage('full name must be a string'),
  check('username')
    .trim()
    .notEmpty()
    .withMessage('user name is required')
    .isString()
    .withMessage('user name must be a string')
    .custom((value) => {
      return UserModel.find({ username: value }).then(
        (username) => {
          console.log(username.length);
          if (username.length > 0) {
            throw 'username is taken!';
          }
        },
      );
    }),
  check('email')
    .notEmpty()
    .withMessage('user email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail()
    .custom((value) => {
      return UserModel.find({ email: value }).then(
        (mail) => {
          if (mail.length > 0) {
            throw 'mail is taken!';
          }
        },
      );
    }),
  check('password')
    .notEmpty()
    .withMessage('password is required')
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minLength: 6,
      minSymbols: 0,
    })
    .withMessage(
      'password must be at least 6 characters long with one lowercase letter and one uppercase letter and at least one numbers',
    ),
  check('phone_number')
    .optional()
    .isMobilePhone()
    .withMessage('invalid phone number'),
  check('picture')
    .optional()
    .isString()
    .withMessage('invalid picture format'),
  check('role').default('User'),
  check('received_orders')
    .optional()
    .isMongoId()
    .withMessage('invalid order format'),
  check('requested_orders')
    .optional()
    .isMongoId()
    .withMessage('invalid order format'),
  check('services')
    .optional()
    .isMongoId()
    .withMessage('invalid service format'),
  validation,
];

export const getUserValidator = [
  check('id').isMongoId().withMessage('invalid user id'),
  validation,
];

export const deleteUserValidator = [
  check('id').isMongoId().withMessage('invalid user id'),
  validation,
];

export const updateUserValidator = [
  check('id').isMongoId().withMessage('invalid user id'),
  check('full_name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('full name is required')
    .isString()
    .withMessage('full name must be a string'),
  check('username')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('user name is required')
    .isString()
    .withMessage('user name must be a string')
    .custom((value) => {
      return UserModel.find({ username: value }).then(
        (username) => {
          console.log(username.length);
          if (username.length > 0) {
            throw 'username is taken!';
          }
        },
      );
    }),
  check('email')
    .optional()
    .notEmpty()
    .withMessage('user email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail()
    .custom((value) => {
      return UserModel.find({ email: value }).then(
        (mail) => {
          if (mail.length > 0) {
            throw 'mail is taken!';
          }
        },
      );
    }),
  check('password')
    .optional()
    .notEmpty()
    .withMessage('password is required')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      'password must be at least 6 characters long with one lowercase letter and one uppercase letter and at least one numbers',
    ),
  check('phone_number')
    .optional()
    .isMobilePhone()
    .withMessage('invalid phone number'),
  check('picture')
    .optional()
    .isString()
    .withMessage('invalid picture format'),

  check('received_orders')
    .optional()
    .isMongoId()
    .withMessage('invalid order format'),
  check('requested_orders')
    .optional()
    .isMongoId()
    .withMessage('invalid order format'),
  check('services')
    .optional()
    .isMongoId()
    .withMessage('invalid service format'),
  validation,
];
