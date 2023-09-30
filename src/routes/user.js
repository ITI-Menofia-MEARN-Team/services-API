import express from 'express';
import {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
  uploadUserImage,
  saveImgInDB,
  updateSaveImgInDB,
} from '../controllers/user.js';
import {
  addUserValidator,
  getUserValidator,
  deleteUserValidator,
  updateUserValidator,
} from '../validations/user.js';
import { isAllowed, isMine, verifyToken } from '../middlewares/auth.js';
import { removeUsernameAndEmail } from '../middlewares/handlePatchRequest.js';

const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(verifyToken, isAllowed('Admin'), uploadUserImage, saveImgInDB, addUserValidator, addUser);

router
  .route('/:id')
  .get(verifyToken, getUserValidator, isMine, getUser)
  .delete(verifyToken, deleteUserValidator, isMine, deleteUser)
  .patch(
    verifyToken,
    uploadUserImage,
    updateSaveImgInDB,
    removeUsernameAndEmail,
    updateUserValidator,
    isMine,

    updateUser,
  );

export default router;
