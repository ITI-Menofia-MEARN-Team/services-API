import mongoose from 'mongoose';

const ExtraPropSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: [true, 'price is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
  },
  {
    timestamps: true,
  },
);
const ExtraPropModel = mongoose.model('ExtraProp', ExtraPropSchema);
export default ExtraPropModel;
