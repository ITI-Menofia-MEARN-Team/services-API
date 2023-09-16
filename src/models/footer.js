import mongoose from 'mongoose';

const footerSchema = new mongoose.Schema({
  public_email: { type: String },
  social_links: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    youtube: { type: String },
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
const FooterModel = mongoose.model('Footer', footerSchema);

export default FooterModel;
