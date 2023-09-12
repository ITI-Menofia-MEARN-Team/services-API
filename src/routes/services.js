import express from 'express';
import {
  addNewService,
  getAllServices,
  getService,
  updateService,
  deleteService,
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
} from '../middlewares/auth.js';

const router = express.Router();

router
  .route('/')
  .post(
    verifyToken,
    isAllowed('Company', 'Admin'),
    addNewServiceValidator,
    isTheSameCompany,
    addNewService,
  )
  .get(getAllServices);
router
  .route('/:id')
  .get(getServiceValidator, getService)
  .patch(verifyToken, updateServiceValidator, isMyService, updateService)
  .delete(verifyToken, deleteServiceValidator, isMyService, deleteService);

export default router;
