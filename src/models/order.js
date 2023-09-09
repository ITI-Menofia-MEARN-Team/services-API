import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'order must belong to a user(user)'],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [
        true,
        'order must belong to a user(company)',
      ],
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'order must have one service'],
    },
  },
  {
    timestamps: true,
  },
);
const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;
