import express from 'express';
import {
  getAllRequests,
  addRequest,
  getRequest,
  deleteRequest,
  updateRequest,
  uploadUserImage,
  saveImgInDB,
} from '../controllers/joinRequest.js';
import { isAllowed, verifyToken } from '../middlewares/auth.js';
import {
  addRequestValidator,
  getRequestValidator,
  deleteRequestValidator,
  updateRequestValidator,
} from '../validations/joinRequest.js';
const router = express.Router();
router
  .route('/')
  .get(verifyToken, isAllowed('Admin'), getAllRequests)
  .post(uploadUserImage, saveImgInDB, addRequestValidator, addRequest);

router
  .route('/:id')
  .get(verifyToken, isAllowed('Admin'), getRequestValidator, getRequest)
  .delete(verifyToken, isAllowed('Admin'), deleteRequestValidator, deleteRequest)
  .patch(verifyToken, isAllowed('Admin'), updateRequestValidator, updateRequest);

export default router;
