import { Request, Response } from 'express';
import authService from '../services/authService.js';
import APIResponse from '../utils/APIResponse.js';
import MESSAGES from '../utils/messagesUtils.js';
import {
  loginValidation,
  registerValidation,
} from '../utils/validations/validation.js';
import tokenHandler from '../utils/handlers/JWTHandler.js';

const registerUser = async (req: Request, res: Response) => {
  try {
    await registerValidation(req.body);
    const newUser = await authService.registerUser(req.body, res);

    APIResponse.success(res, MESSAGES.SUCCESS.REGISTER, newUser, 201);
  } catch (err: any) {
    APIResponse.error(res, err.message, 500);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    await loginValidation(req.body);

    const user = await authService.loginUser(req.body, res);

    const token = tokenHandler.generateToken(user.id);

    APIResponse.success(
      res,
      MESSAGES.SUCCESS.LOGIN,
      { user, token },
      200,
    );
  } catch (err: any) {
    APIResponse.error(res, err.message, 500);
  }
};

export { registerUser, loginUser };
