import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.js';
import { addUserValidator, loginUserValidator } from '../validations/user.js';

const router = Router();

router.route('/register').post(addUserValidator, registerUser);
router.route('/login').post(loginUserValidator, loginUser);

export default router;
