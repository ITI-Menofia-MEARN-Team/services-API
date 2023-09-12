import { Router } from 'express';
import {
  AddExtraProp,
  deleteExtraProp,
  getAllExtraProps,
  getExtraProp,
  updateExtraProp,
} from '../controllers/extraProp.js';

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
  .get(getAllExtraProps)
  .post(verifyToken, isAllowed('Company', 'Admin'), AddExtraProp);

router
  .route('/:id')
  .get(getExtraProp)
  .delete(verifyToken, isAllowed('Company', 'Admin'), deleteExtraProp)
  .put(verifyToken, isAllowed('Company', 'Admin'), updateExtraProp);

export default router;
