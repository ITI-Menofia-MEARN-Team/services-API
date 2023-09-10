import { check } from 'express-validator';
import validation from '../middlewares/validate.js';

export const addNewServiceValidator = [
  check('title')
    .trim()
    .notEmpty()
    .withMessage('service title is required')
    .isString()
    .withMessage('service title must be a string'),
  check('description')
    .trim()
    .notEmpty()
    .withMessage('service description is required')
    .isString()
    .withMessage('service description must be a string'),
  check('price')
    .exists()
    .withMessage('service price is required')
    .isNumeric()
    .withMessage('invalid service price'),
  check('category')
    .trim()
    .notEmpty()
    .withMessage('service category is required')
    .isString()
    .withMessage('invalid service category'),
  check('company')
    .exists()
    .withMessage('service company is required')
    .isMongoId()
    .withMessage(
      'service must be belong to a user(company)',
    ),
  check('images')
    .optional()
    .isArray()
    .custom((value) => {
      if (
        !value.every((item) => typeof item === 'string')
      ) {
        throw new Error(
          'images must be an array of strings',
        );
      }
      return true;
    }),
  check('props')
    .optional()
    .isArray()
    .custom((value) => {
      if (
        !value.every((item) => typeof item === 'string')
      ) {
        throw new Error(
          'props must be an array of strings',
        );
      }
      return true;
    }),
  validation,
];

export const getServiceValidator = [
  check('id').isMongoId().withMessage('Invalid id format'),
  validation,
];

export const deleteServiceValidator = [
  check('id').isMongoId().withMessage('Invalid id format'),
  validation,
];

export const updateServiceValidator = [
  check('id').isMongoId().withMessage('Invalid id format'),
  check('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('service title is required')
    .isString()
    .withMessage('service title must be a string')
    .trim(),
  check('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('service description is required')
    .isString()
    .withMessage('service description must be a string'),
  check('price')
    .optional()
    .isNumeric()
    .withMessage('invalid service price'),
  check('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('service category is required')
    .isString()
    .withMessage('invalid service category'),
  check('company')
    .optional()
    .isMongoId()
    .withMessage(
      'service must be belong to a user(company)',
    ),
  check('images')
    .optional()
    .isArray()
    .custom((value) => {
      if (
        !value.every((item) => typeof item === 'string')
      ) {
        throw new Error(
          'images must be an array of strings',
        );
      }
      return true;
    }),
  check('props')
    .optional()
    .isArray()
    .custom((value) => {
      if (
        !value.every((item) => typeof item === 'string')
      ) {
        throw new Error(
          'props must be an array of strings',
        );
      }
      return true;
    }),
  validation,
];
