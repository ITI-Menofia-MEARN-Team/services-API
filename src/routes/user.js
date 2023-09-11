import express from 'express';
import { getAllUsers, addUser, getUser, deleteUser, updateUser } from '../controllers/user.js';
import {
  addUserValidator,
  getUserValidator,
  deleteUserValidator,
  updateUserValidator,
} from '../validations/user.js';
import { isAllowed, isMine, verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.route('/').get(getAllUsers).post(addUserValidator, addUser);

router
  .route('/:id')
  .get(getUserValidator, getUser)
  .delete(verifyToken, deleteUserValidator, isMine, deleteUser)
  .patch(updateUserValidator, updateUser);

export default router;
