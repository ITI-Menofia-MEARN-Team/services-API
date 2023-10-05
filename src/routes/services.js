import express from 'express';
import multer from 'multer';
import ErrorAPI from '../utils/errorAPI.js';
const router = express.Router();

import {
  addNewService,
  getAllServices,
  getService,
  updateService,
  deleteService,
  getCompanyServices,
  uploadSeriveImg,
  saveImgInDB,
} from '../controllers/services.js';
import {
  addNewServiceValidator,
  getServiceValidator,
  deleteServiceValidator,
  updateServiceValidator,
} from '../validations/service.js';
import {
  isAllowed,
  isMine,
  verifyToken,
  isTheSameCompany,
  isMyService,
  isOrderAllowed,
} from '../middlewares/auth.js';
import Service from '../models/service.js';
import { deleteImage } from '../middlewares/uploadImage.js';
import { deleteExtraProps } from '../middlewares/handlePatchRequest.js';

router
  .route('/')
  .post(
    verifyToken,
    isAllowed('Company', 'Admin'),
    uploadSeriveImg,
    saveImgInDB,
    addNewServiceValidator,
    isTheSameCompany,
    addNewService,
  )
  .get(getAllServices);
router
  .route('/:id')
  .get(getServiceValidator, getService)
  .patch(
    verifyToken,
    uploadSeriveImg,
    saveImgInDB,
    updateServiceValidator,
    isMyService,
    deleteExtraProps,
    deleteImage(Service, 'images', 'service'),
    updateService,
  )
  .delete(
    verifyToken,
    deleteServiceValidator,
    isMyService,
    deleteImage(Service, 'images', 'service'),
    deleteService,
  );

router.route('/company/:id').get(getCompanyServices);
export default router;
