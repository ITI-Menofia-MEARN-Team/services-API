import express from 'express';
import { getAllUsers, addUser, getUser, deleteUser, updateUser } from '../controllers/user.js';
import {
  addUserValidator,
  getUserValidator,
  deleteUserValidator,
  updateUserValidator,
} from '../validations/user.js';

const router = express.Router();

router.route('/').get(getAllUsers).post(addUserValidator, addUser);

router
  .route('/:id')
  .get(getUserValidator, getUser)
  .delete(deleteUserValidator, deleteUser)
  .patch(updateUserValidator, updateUser);

export default router;
