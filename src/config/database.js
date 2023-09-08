import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Database Connection
export const connection = () =>
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log('DB connected successfully ✅');
    })
    .catch((err) => console.log({ err }));
