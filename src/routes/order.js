import { Router } from 'express';
import {
  AddOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} from '../controllers/order.js';

const router = Router();
router.route('/').get(getAllOrders).post(AddOrder);

router.route('/:id').get(getOrder).delete(deleteOrder).put(updateOrder);

export default router;
