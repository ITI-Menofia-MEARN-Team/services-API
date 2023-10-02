import express from 'express';
import { handleSearch } from '../controllers/search.js';

const router = express.Router();
router.route('/').get(handleSearch);
// router.route('/dashboard').get(handleSearchInDashboard);

export default router;
