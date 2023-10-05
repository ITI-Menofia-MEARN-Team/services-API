import express from 'express';
import { getCompany } from '../controllers/user.js';
const router = express.Router();

router.route('/:id').get(getCompany);

export default router;
