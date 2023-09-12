import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.js';
import { addUserValidator, loginUserValidator } from '../validations/user.js';
import { verifyToken } from '../middlewares/auth.js';
import cookieParser from 'cookie-parser';

const router = Router();

router.use(cookieParser());

router.route('/register').post(addUserValidator, registerUser);
router.route('/login').post(loginUserValidator, loginUser);
router.route('/logout').post(verifyToken, logoutUser);

export default router;
