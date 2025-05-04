import { Response } from 'express';

class APIResponse {
  static success<T>(
    res: Response,
    message: string,
    data: T,
    statusCode: number = 200,
  ) {
    return res.status(statusCode).json({ message, data });
  }

  static error(
    res: Response,
    message: string = 'error',
    statusCode: number = 500,
  ) {
    return res.status(statusCode).json({ message });
  }
}

export default APIResponse;
