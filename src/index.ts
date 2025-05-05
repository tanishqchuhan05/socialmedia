import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/dbConnect.js';
import './models/userModels.js';
import router from './routes/authRoutes.js';
import postRouter from './routes/postRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import likesRouter from './routes/likesRoutes.js';
import logger from './utils/logger/logger.js';
dotenv.config();

const app: Application = express();
app.use(express.json());

app.use(router);
app.use(postRouter);
app.use(commentRouter);
app.use(likesRouter);

connectToDatabase();

app.listen(Number(process.env.PORT), () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});
