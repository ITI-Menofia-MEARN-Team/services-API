import express from 'express';
import {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
  uploadUserImage,
  saveImgInDB,
} from '../controllers/user.js';
import {
  addUserValidator,
  getUserValidator,
  deleteUserValidator,
  updateUserValidator,
} from '../validations/user.js';
import { isAllowed, isMine, verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(verifyToken, isAllowed('Admin'), uploadUserImage, saveImgInDB, addUserValidator, addUser);

router
  .route('/:id')
  .get(verifyToken, getUserValidator, isMine, getUser)
  .delete(verifyToken, deleteUserValidator, isMine, deleteUser)
  .patch(verifyToken, updateUserValidator, isMine, updateUser);

export default router;
