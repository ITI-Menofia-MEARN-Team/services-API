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
    updateService,
  )
  .delete(verifyToken, deleteServiceValidator, isMyService, deleteService);

router.route('/company/:id').get(getCompanyServices);
export default router;
