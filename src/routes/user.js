import express from "express";
import {
    getAllUsers,
    AddUser,
    getAUser,
    deleteUser,
    updateUser
} from '../controllers/user';

const router = express.Router();
router.route('/').get(getAllUsers).post(AddUser);

router.route('/:id')
.get(getAUser)
.delete(deleteUser)
.put(updateUser);

export default router;