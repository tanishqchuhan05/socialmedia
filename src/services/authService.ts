import User from '../models/userModels.js';
import APIResponse from '../utils/APIResponse.js';
import { ILogin } from '../utils/interface/ILogin.js';
import IUser from '../utils/interface/IUser.js';
import MESSAGES from '../utils/messagesUtils.js';
import PasswordHandler from '../utils/handlers/passwordHandler.js';
import { Response } from 'express';

const authService = {
  registerUser: async (userData: IUser, res: Response) => {
    const { name, email, password } = userData;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({
        where: { email: email },
      });

      if (existingUser) {
        APIResponse.error(
          res,
          MESSAGES.ERROR.USER_ALREADY_EXISTS,
          400,
        );
      }

      // Hash password
      const hashedPassword =
        await PasswordHandler.hashPassword(password);

      // Create a new user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return newUser.toJSON();
    } catch (error: any) {
      throw new Error(
        MESSAGES.ERROR.REGISTRATION_FAILED + error.message,
      );
    }
  },

  loginUser: async (loginData: ILogin, res: Response) => {
    const { email, password } = loginData;
    try {
      // Find user by email
      const user = await User.findOne({
        where: { email: email },
      });

      if (!user) {
        APIResponse.error(
          res,
          MESSAGES.ERROR.USER_ALREADY_EXISTS,
          404,
        );
      }

      const userData = user?.toJSON();

      // Compare password
      const isPasswordValid = await PasswordHandler.comparePassword(
        password,
        userData.password,
      );
      if (!isPasswordValid) {
        throw new Error(MESSAGES.ERROR.INVALID_CREDENTIALS);
      }

      return userData;
    } catch (error: any) {
      throw new Error(MESSAGES.ERROR.LOGIN_FAILED);
    }
  },
};
export default authService;
