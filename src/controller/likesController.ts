import { Request, Response } from 'express';
import likeService from '../services/likesService.js';
import APIResponse from '../utils/APIResponse.js';
import MESSAGES from '../utils/messagesUtils.js';
import {
  addLikeSchema,
  getLikesSchema,
} from '../utils/validations/likeValidation.js';

export const addLike = async (req: Request, res: Response) => {
  try {
    const { user_id, type, post_id, comment_id } = req.body;
    await addLikeSchema.validate(req.body);
    if (
      !user_id ||
      !type ||
      (type === 'post' && !post_id) ||
      (type === 'comment' && !comment_id)
    ) {
      APIResponse.error(res, MESSAGES.ERROR.MISSING_FIELDS, 400);
    }

    await likeService.addLike(
      { user_id, post_id, comment_id, type },
      res,
    );
  } catch (error: any) {
    APIResponse.error(res, MESSAGES.ERROR.MISSING_FIELDS, 400);
  }
};

export const getLikes = async (req: Request, res: Response) => {
  try {
    const post_id = req.query?.toString();
    const comment_id = req.query?.toString();

    await getLikesSchema.validate({ post_id, comment_id });
    if (!post_id && !comment_id) {
      APIResponse.error(res, MESSAGES.ERROR.MISSING_FIELDS, 400);
    }

    await likeService.getLikes({ post_id, comment_id }, res);
  } catch (error: any) {
    console.error('Controller Error in getLikes:', error.message);
    APIResponse.error(res, MESSAGES.ERROR.INTERNAL_SERVER_ERROR, 500);
  }
};
