import express from 'express';
import dotenv from 'dotenv';
import { connection } from './config/database.js';
import ErrorAPI from './utils/errorAPI.js';
import globalError from './middlewares/error.js';
import orderRouter from './routes/order.js';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import servicesRouter from './routes/services.js';
import categoryRouter from './routes/category.js';
import extraPropsRouter from './routes/extraProp.js';
import joinRouter from './routes/joinRequest.js';
import searchRouter from './routes/search.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'node:fs';

// Configuration
dotenv.config();
connection();

// Express
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Global Middlewares
app.use(cors());
app.use(express.json());

// Define a route to send the blob image
app.get('/image', (req, res) => {
  // Read the image file as a binary buffer
  const imageBuffer = fs.readFileSync(path.join(__dirname, `uploads/${req.body.path}`));

  // Set the appropriate content type for your image
  // res.contentType('image/*');

  // Send the image buffer as the response
  res.send(imageBuffer);
});

// Routes
app.use('/order', orderRouter);
app.use('/service', servicesRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/extraProp', extraPropsRouter);
app.use('/auth', authRouter);
app.use('/join', joinRouter);
app.use('/search', searchRouter);

// Not Found
app.all('*', (req, res, next) => {
  next(new ErrorAPI(`Can't find this route: ${req.originalUrl}`, 404));
});

// Error middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`app listening on port : ${PORT} `);
});
