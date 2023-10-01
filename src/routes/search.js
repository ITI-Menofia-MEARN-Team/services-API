import express from 'express';
import { handleSearch, handlingSearchForCompany } from '../controllers/search.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();
router.route('/').get(handleSearch);
router.route('/company').get(verifyToken, handlingSearchForCompany);

export default router;
