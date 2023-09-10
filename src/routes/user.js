import express from 'express';
import {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
} from '../controllers/user.js';

const router = express.Router();
router.route('/').get(getAllUsers).post(addUser);

router
  .route('/:id')
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser);

export default router;
