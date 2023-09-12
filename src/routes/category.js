import { Router } from 'express';
import {
  AddCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '../controllers/category.js';

import {
  isAllowed,
  isMine,
  verifyToken,
  isTheSameCompany,
  isMyService,
  isOrderAllowed,
} from '../middlewares/auth.js';

const router = Router();
router
  .route('/')
  .get(getAllCategories)
  .post(verifyToken, isAllowed('Company', 'Admin'), AddCategory);

router
  .route('/:id')
  .get(getCategory)
  .delete(verifyToken, isAllowed('Company', 'Admin'), deleteCategory)
  .put(verifyToken, isAllowed('Company', 'Admin'), updateCategory);

export default router;
