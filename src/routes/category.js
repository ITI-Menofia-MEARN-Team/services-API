import { Router } from 'express';
import {
  AddCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '../controllers/category.js';

const router = Router();
router.route('/').get(getAllCategories).post(AddCategory);

router
  .route('/:id')
  .get(getCategory)
  .delete(deleteCategory)
  .put(updateCategory);

export default router;
