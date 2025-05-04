import Comments from '../models/commentModels.js';
import APIResponse from '../utils/APIResponse.js';
import MESSAGES from '../utils/messagesUtils.js';
import { Response } from 'express';
import { IComments } from '../utils/interface/CommentInterface/IComments.js';
import { IGetComment } from '../utils/interface/CommentInterface/IGetComment.js';
import { IDelComment } from '../utils/interface/CommentInterface/IDelComment.js';
import { IUpdateComment } from '../utils/interface/CommentInterface/IUpdateComment.js';
import { IFindComment } from '../utils/interface/CommentInterface/IFIndComment.js';

const commentService = {
  addComment: async (data: IComments, res: Response) => {
    const { user_id, post_id, comment, reply_id } = data;
    try {
      if (reply_id) {
        const replyComment = await Comments.findOne({
          where: { id: reply_id },
        });
        if (!replyComment) {
          APIResponse.error(
            res,
            MESSAGES.ERROR.REPLY_COMMENT_NOT_FOUND,
          );
        }
      }

      const newComment = await Comments.create({
        user_id,
        post_id,
        comment,
        reply_id: reply_id ? reply_id : null,
      });

      return newComment;
    } catch (error: any) {
      APIResponse.error(
        res,
        MESSAGES.ERROR.COMMENT_CREATION_FAILED,
        500,
      );
    }
  },

  getComment: async (getCommentData: IGetComment, res: Response) => {
    const { post_id } = getCommentData;
    try {
      const comments = await Comments.findAll({
        where: { post_id, isDelete: false },
      });
      if (!comments) {
        APIResponse.error(
          res,
          MESSAGES.ERROR.COMMENT_FETCHED_FAILED,
          404,
        );
      }
      return comments;
    } catch (error: any) {
      APIResponse.error(
        res,
        MESSAGES.ERROR.COMMENT_FETCHED_FAILED + error.message,
        500,
      );
    }
  },

  findComment: async (data: IFindComment, res: Response) => {
    const { comment_id } = data;
    try {
      const comment = await Comments.findByPk(comment_id);
      return comment;
    } catch (error: any) {
      APIResponse.error(
        res,
        MESSAGES.ERROR.COMMENT_NOT_FOUND + error.message,
        500,
      );
    }
  },

  deleteComment: async (data: IDelComment, res: Response) => {
    const { comment_id } = data;
    try {
      const delComment = await Comments.update(
        { isDelete: true },
        { where: { id: comment_id } },
      );
      return delComment;
    } catch (error: any) {
      APIResponse.error(
        res,
        MESSAGES.ERROR.COMMENT_DELETION_FAILED + error.message,
        500,
      );
    }
  },

  updateComment: async (data: IUpdateComment, res: Response) => {
    const { comment_id, updatedData } = data;
    try {
      const commentData = await Comments.update(updatedData, {
        where: { id: comment_id },
      });
      if (commentData) {
        const returnData = await Comments.findOne({
          where: { id: comment_id },
        });
        return returnData;
      }
    } catch (error: any) {
      APIResponse.error(
        res,
        MESSAGES.ERROR.COMMENT_UPDATE_FAILED + error.message,
        500,
      );
    }
  },
};

export default commentService;
