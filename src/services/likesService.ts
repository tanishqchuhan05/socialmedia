import Likes from '../models/likesModels.js';
import postService from './postService.js';
import commentService from './commentService.js';
import MESSAGES from '../utils/messagesUtils.js';
import APIResponse from '../utils/APIResponse.js';
import { Response } from 'express';
import { ILikes } from '../utils/interface/ILikes.js';
import { IGetLikes } from '../utils/interface/IGetLikes.js';

const likeService = {
  // Add like to a post or comment
  addLike: async (data: ILikes, res: Response) => {
    try {
      const { user_id, post_id, comment_id, type } = data;
      const user = await postService.findUser({ user_id }, res);
      if (!user)
        APIResponse.error(res, MESSAGES.ERROR.USER_NOT_FOUND);

      if (type === 'post') {
        const post = await postService.findPost(
          { post_id: post_id! },
          res,
        );
        if (!post)
          APIResponse.error(res, MESSAGES.ERROR.POST_NOT_FOUND);
      } else if (type === 'comment' && comment_id) {
        const comment = await commentService.findComment(
          { comment_id },
          res,
        );
        if (!comment)
          APIResponse.error(res, MESSAGES.ERROR.COMMENT_NOT_FOUND);
      }

      const existingLike = await Likes.findOne({
        where: {
          user_id,
          post_id: type === 'post' ? post_id : null,
          comment_id: type === 'comment' ? comment_id : null,
          type,
        },
      });

      if (existingLike)
        APIResponse.error(res, MESSAGES.ERROR.ALREADY_LIKED);

      const like = await Likes.create({
        user_id,
        type,
        post_id: type === 'post' ? post_id : null,
        comment_id: type === 'comment' ? comment_id : null,
      });

      APIResponse.success(res, MESSAGES.SUCCESS.LIKE_ADDED, {});
    } catch (error: any) {
      console.error('Error in addLike:', error.message);
      APIResponse.error(res, MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
    }
  },

  // Get all likes for post or comment
  getLikes: async (data: IGetLikes, res: Response) => {
    const { post_id, comment_id } = data;
    try {
      const whereCondition: any = {};
      if (post_id) whereCondition.post_id = post_id;
      if (comment_id) whereCondition.comment_id = comment_id;

      const likes = await Likes.findAll({ where: whereCondition });

      if (!likes) {
        APIResponse.error(res, MESSAGES.ERROR.LIKE_NOT_FOUND, 404);
      }

      APIResponse.success(
        res,
        MESSAGES.SUCCESS.LIKES_FETCH_SUCCESSFULLY,
        likes,
      );
    } catch (error: any) {
      console.error('Service Error in getLikes:', error.message);
      APIResponse.error(res, MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
    }
  },
};

export default likeService;
