import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'title is required'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'description is required'],
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
    },
    images: [String],
    props: [String],
    extra_props: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExtraProps',
      },
    ],
    category: {
      type: String,
      required: [true, 'category is required'],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'service must be belong to a user(company)'],
    },
  },
  {
    timestamps: true,
  },
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;
