import { Request, Response } from 'express';
import commentService from '../services/commentService.js';
import APIResponse from '../utils/APIResponse.js';
import MESSAGES from '../utils/messagesUtils.js';
import postService from '../services/postService.js';
import {
  addCommentSchema,
  deleteCommentSchema,
  getCommentSchema,
  updateCommentSchema,
} from '../utils/validations/commentValidation.js';

const addComment = async (req: Request, res: Response) => {
  const { post_id, user_id, comment, reply_id } = req.body;
  try {
    await addCommentSchema.validate(req.body);
    const isPostExist = await postService.findPost(post_id, res);
    if (!isPostExist) {
      APIResponse.error(res, MESSAGES.ERROR.POST_NOT_FOUND, 404);
    }

    const newComment = await commentService.addComment(
      {
        post_id,
        user_id,
        comment,
        reply_id,
      },
      res,
    );

    APIResponse.success(
      res,
      MESSAGES.SUCCESS.COMMENT_ADDED_SUCCESSFULLY,
      newComment,
      201,
    );
  } catch (error: any) {
    APIResponse.error(
      res,
      MESSAGES.ERROR.COMMENT_CREATION_FAILED,
      500,
    );
  }
};

const getComment = async (req: Request, res: Response) => {
  const { post_id } = req.body;

  try {
    await getCommentSchema.validate(req.body);
    const isPostExist = await postService.findPost(post_id, res);
    if (!isPostExist) {
      APIResponse.error(res, MESSAGES.ERROR.POST_NOT_FOUND, 404);
    }

    const comments = await commentService.getComment(post_id, res);

    APIResponse.success(
      res,
      MESSAGES.SUCCESS.COMMENT_FETCHED_SUCCESSFULLY,
      comments,
      200,
    );
  } catch (error: any) {
    APIResponse.error(
      res,
      MESSAGES.ERROR.COMMENT_FETCHED_FAILED,
      500,
    );
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const { comment_id } = req.body;

  try {
    await deleteCommentSchema.validate(req.body);
    const isCommentExist = await commentService.findComment(
      comment_id,
      res,
    );
    if (!isCommentExist) {
      APIResponse.error(res, MESSAGES.ERROR.COMMENT_NOT_FOUND, 404);
    }

    const delComment = await commentService.deleteComment(
      comment_id,
      res,
    );
    if (!delComment) {
      APIResponse.error(res, MESSAGES.ERROR.COMMENT_NOT_FOUND, 404);
    }

    APIResponse.success(
      res,
      MESSAGES.SUCCESS.COMMENT_DELETED_SUCCESSFULLY,
      delComment,
      200,
    );
  } catch (error: any) {
    APIResponse.error(
      res,
      MESSAGES.ERROR.COMMENT_DELETION_FAILED,
      500,
    );
  }
};

const updateComment = async (req: Request, res: Response) => {
  const { comment_id, ...updatedData } = req.body;

  try {
    await updateCommentSchema.validate(req.body);
    const isCommentExist = await commentService.findComment(
      comment_id,
      res,
    );
    if (!isCommentExist) {
      APIResponse.error(res, MESSAGES.ERROR.COMMENT_NOT_FOUND, 404);
    }

    const updatedComment = await commentService.updateComment(
      { comment_id, updatedData },
      res,
    );

    APIResponse.success(
      res,
      MESSAGES.SUCCESS.COMMENT_UPDATE_SUCCESSFULLY,
      updatedComment,
      200,
    );
  } catch (error: any) {
    APIResponse.error(res, MESSAGES.ERROR.COMMENT_UPDATE_FAILED, 500);
  }
};

export { addComment, getComment, deleteComment, updateComment };
