import { Router } from 'express';
import {
  AddOrder,
  deleteOrder,
  getAllOrders,
  getCompanyOrders,
  getOrder,
  updateOrder,
} from '../controllers/order.js';

import {
  getOrderValidator,
  createOrderValidator,
  updateOrderValidator,
  deleteOrderValidator,
} from '../validations/orders.js';

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
  .get(verifyToken, getAllOrders)
  .post(verifyToken, isAllowed('User'), createOrderValidator, AddOrder);

router
  .route('/:id')
  .get(verifyToken, isOrderAllowed, getOrderValidator, getOrder)
  .delete(verifyToken, isOrderAllowed, deleteOrderValidator, deleteOrder)
  .patch(verifyToken, isOrderAllowed, updateOrderValidator, updateOrder);

router
  .route('/company/:id')
  .get(verifyToken, isAllowed('Company', 'Admin'), isMine, getCompanyOrders);

export default router;
