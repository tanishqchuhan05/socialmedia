// allRoutes.ts
import { Router } from 'express';
import authRouter from './authRoutes.js';
import postRouter from './postRoutes.js';
import commentRouter from './commentRoutes.js';
import likesRouter from './likesRoutes.js';

const allRoutes = Router();

allRoutes.use('/auth', authRouter);
allRoutes.use('/post', postRouter);
allRoutes.use('/comment', commentRouter);
allRoutes.use('/like', likesRouter);

export default allRoutes;
