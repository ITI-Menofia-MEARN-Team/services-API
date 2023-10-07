import express from 'express';
import dotenv from 'dotenv';
import { connection } from './config/database.js';
import ErrorAPI from './utils/errorAPI.js';
import globalError from './middlewares/error.js';
import orderRouter from './routes/order.js';
import userRouter from './routes/user.js';
import companyRouter from './routes/company.js';
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
app.post('/image', (req, res) => {
  // Get the image path from the query parameter
  const imagePath = req.body.path;

  if (!imagePath) {
    return res.status(400).json({ error: 'Image path is missing' });
  }

  // Read the image file as a binary buffer
  const imageBuffer = fs.readFileSync(path.join(__dirname, `uploads/${imagePath}`));

  // Determine the MIME type based on the file extension
  const extension = path.extname(imagePath).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.bmp': 'image/bmp',
    '.webp': 'image/webp',
    '.tiff': 'image/tiff',
    '.tif': 'image/tiff',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    // '.pdf': 'application/pdf',
    '.jp2': 'image/jp2',
    // '.webm': 'video/webm',
    // Add more image types as needed
  };

  // Set the appropriate content type in the response header
  res.setHeader('Content-Type', mimeTypes[extension] || 'application/octet-stream');

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
app.use('/company', companyRouter);

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
