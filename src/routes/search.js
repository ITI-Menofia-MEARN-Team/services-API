import express from 'express';
import { handleSearch } from '../controllers/search.js';

const router = express.Router();
router.route('/').get(handleSearch);

export default router;
