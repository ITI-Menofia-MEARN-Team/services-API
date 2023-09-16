import express from 'express';
import { getAllUsers, addUser, getUser, deleteUser, updateUser } from '../controllers/user.js';
import {
  addUserValidator,
  getUserValidator,
  deleteUserValidator,
  updateUserValidator,
} from '../validations/user.js';
import { isAllowed, isMine, verifyToken } from '../middlewares/auth.js';
import multer from 'multer';
import ErrorAPI from '../utils/errorAPI.js';
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/user');
  },
  filename: (req, file, cb) => {
    const exe = file.mimetype.split('/')[1];
    const fileName = `user-${Date.now()}.${exe}`;
    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split('/')[0];
  if (imageType === 'image') {
    cb(null, true);
  } else {
    cb(new ErrorAPI('يجب أن يكون الملف صورة'));
  }
};
const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(
    verifyToken,
    isAllowed('Admin'),
    upload.single('picture'),
    (req, res, next) => {
      const userPic = req.file;
      req.body.picture = userPic.filename;
      next();
    },
    addUserValidator,
    addUser,
  );

router
  .route('/:id')
  .get(verifyToken, getUserValidator, isMine, getUser)
  .delete(verifyToken, deleteUserValidator, isMine, deleteUser)
  .patch(verifyToken, updateUserValidator, isMine, updateUser);

export default router;
