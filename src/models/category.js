import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'اسم الفئة مطلوب'],
    },
  },
  {
    timestamps: true,
  },
);
const CategoryModel = mongoose.model('Category', CategorySchema);
export default CategoryModel;
