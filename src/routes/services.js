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
const router = express.Router();

router.route('/').post(addNewServiceValidator, addNewService).get(getAllServices);
router
  .route('/:id')
  .get(getServiceValidator, getService)
  .patch(updateServiceValidator, updateService)
  .delete(deleteServiceValidator, deleteService);

export default router;
