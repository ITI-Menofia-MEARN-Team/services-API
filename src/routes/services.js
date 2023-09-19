import express from 'express';
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

import multer from 'multer';
import ErrorAPI from '../utils/errorAPI.js';
// const diskStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'src/uploads/service');
//   },
//   filename: function (req, file, cb) {
//     const exe = file.mimetype.split('/')[1];
//     const fileName = `service-${Date.now()}.${exe}`;
//     cb(null, fileName);
//   },
// });
// const fileFilter = (req, file, cb) => {
//   const imageType = file.mimetype.split('/')[0];
//   if (imageType === 'image') {
//     return cb(null, true);
//   } else {
//     return cb(new ErrorAPI('يجب أن يكون الملف صورة', 400), false);
//   }
// };

// const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

const router = express.Router();

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
