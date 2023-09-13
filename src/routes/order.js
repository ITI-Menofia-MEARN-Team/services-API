import { Router } from 'express';
import {
  AddOrder,
  deleteOrder,
  getAllOrders,
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
  .put(verifyToken, isOrderAllowed, updateOrderValidator, updateOrder);

export default router;
