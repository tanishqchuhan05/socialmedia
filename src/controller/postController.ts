import { Request, Response } from 'express';
import postService from '../services/postService.js';
import APIResponse from '../utils/APIResponse.js';
import MESSAGES from '../utils/messagesUtils.js';
import {
  addPostSchema,
  deletePostSchema,
  getAllPostsSchema,
  getSinglePostSchema,
  updatePostSchema,
} from '../utils/validations/postValidation.js';

const addPost = async (req: Request, res: Response) => {
  const { user_id, image, caption } = req.body;

  try {
    await addPostSchema.validate(req.body);
    const isUserExist = await postService.findUser(user_id, res);
    if (!isUserExist) {
      APIResponse.error(res, MESSAGES.ERROR.USER_NOT_FOUND, 404);
    }

    const newPost = await postService.addPost(
      { user_id, image, caption },
      res,
    );
    APIResponse.success(
      res,
      MESSAGES.SUCCESS.POST_CREATED_SUCCESSFULLY,
      newPost,
      201,
    );
  } catch (err: any) {
    APIResponse.error(res, err.message, 500);
  }
};

const updatePost = async (req: Request, res: Response) => {
  const { post_id, ...updatedData } = req.body;
  try {
    await updatePostSchema.validate(req.body);
    const isPostExist = await postService.findPost(post_id, res);
    if (!isPostExist) {
      APIResponse.error(res, MESSAGES.ERROR.POST_NOT_FOUND, 404);
    }

    const updatedPost = await postService.updatePost(
      { post_id, updatedData },
      res,
    );
    APIResponse.success(
      res,
      MESSAGES.SUCCESS.POST_UPDATE_SUCCESSFULLY,
      updatedPost,
      200,
    );
  } catch (error: any) {
    APIResponse.error(res, error.message, 500);
  }
};

const deletePost = async (req: Request, res: Response) => {
  const { post_id } = req.body;
  try {
    await deletePostSchema.validate(req.body);
    const isPostExist = await postService.findPost(post_id, res);
    if (!isPostExist) {
      APIResponse.error(res, MESSAGES.ERROR.POST_NOT_FOUND, 404);
    }

    const delPost = await postService.deletePost(post_id, res);
    APIResponse.success(
      res,
      MESSAGES.SUCCESS.POST_DELETE_SUCCESSFULLY,
      delPost,
      200,
    );
  } catch (error: any) {
    APIResponse.error(res, error.message, 500);
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  try {
    await getAllPostsSchema.validate(req.body);
    const isUserExist = await postService.findUser(user_id, res);
    if (!isUserExist) {
      APIResponse.error(res, MESSAGES.ERROR.USER_NOT_FOUND, 404);
    }

    const allPosts = await postService.getAllPosts(user_id, res);
    APIResponse.success(
      res,
      MESSAGES.SUCCESS.POST_FETCH_SUCCESSFULLY,
      allPosts,
      200,
    );
  } catch (error: any) {
    APIResponse.error(res, error.message, 500);
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  const { user_id, post_id } = req.body;
  try {
    await getSinglePostSchema.validate(req.body);
    const isPostExist = await postService.findPost(post_id, res);
    if (!isPostExist) {
      APIResponse.error(res, MESSAGES.ERROR.POST_NOT_FOUND, 404);
    }

    const singlePost = await postService.getSinglePost(
      { user_id, post_id },
      res,
    );
    APIResponse.success(
      res,
      MESSAGES.SUCCESS.POST_FETCH_SUCCESSFULLY,
      singlePost,
      200,
    );
  } catch (error: any) {
    APIResponse.error(res, error.message, 500);
  }
};

export {
  addPost,
  updatePost,
  deletePost,
  getAllPosts,
  getSinglePost,
};
