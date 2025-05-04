import {
  registerUser,
  loginUser,
} from '../controller/authController.js';
import { Router } from 'express';
import { AuthRoutes } from './indexRoutes.js';

const router = Router();

router.post(AuthRoutes.REGISTER, registerUser);
router.post(AuthRoutes.LOGIN, loginUser);

export default router;
