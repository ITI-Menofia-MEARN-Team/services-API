import express from 'express';
import dotenv from 'dotenv';
import { connection } from './config/database.js';
import ErrorAPI from './utils/errorAPI.js';
import globalError from './middlewares/error.js';
import orderRouter from './routes/order.js';
import userRouter from './routes/user.js';
import servicesRouter from './routes/services.js';
import categoryRouter from './routes/category.js';
import extraPropsRouter from './routes/extraProp.js';

// Configuration
dotenv.config();
connection();

// Express
const app = express();

// Global Middlewares
app.use(express.json());

// Routes
app.use('/order', orderRouter);
app.use('/service', servicesRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/extraProp', extraPropsRouter);

// Not Found
app.all('*', (req, res, next) => {
  next(
    new ErrorAPI(
      `Can't find this route: ${req.originalUrl}`,
      404,
    ),
  );
});

// Error middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`app listening on port : ${PORT} `);
});
