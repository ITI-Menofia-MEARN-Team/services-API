import { Router } from 'express';
import {
  AddExtraProp,
  deleteExtraProp,
  getAllExtraProps,
  getExtraProp,
  updateExtraProp,
} from '../controllers/extraProp.js';

const router = Router();
router.route('/').get(getAllExtraProps).post(AddExtraProp);

router.route('/:id').get(getExtraProp).delete(deleteExtraProp).put(updateExtraProp);

export default router;
