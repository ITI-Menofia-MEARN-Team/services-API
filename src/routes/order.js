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

const router = Router();
router.route('/').get(getAllOrders).post(createOrderValidator, AddOrder);

router
  .route('/:id')
  .get(getOrderValidator, getOrder)
  .delete(deleteOrderValidator, deleteOrder)
  .put(updateOrderValidator, updateOrder);

export default router;
