import Posts from '../models/postModels.js';
import User from '../models/userModels.js';
import APIResponse from '../utils/APIResponse.js';
import { ICreatePost } from '../utils/interface/ICreatePost.js';
import { IDeletePost } from '../utils/interface/IDeletePost.js';
import { IFindPost } from '../utils/interface/IFindPost.js';
import { IFindUser } from '../utils/interface/IFindUser.js';
import { IGetAllPost } from '../utils/interface/IGetAllPost.js';
import { IGetSinglePost } from '../utils/interface/IGetSinglePost.js';
import { IUpdatePost } from '../utils/interface/IUpdatePost.js';
import MESSAGES from '../utils/messagesUtils.js';
import { Response } from 'express';

const postService = {
  findUser: async (data: IFindUser, res: Response) => {
    const { user_id } = data;
    try {
      const user = await User.findOne({
        where: { id: user_id },
      });
      return user;
    } catch (error: any) {
      APIResponse.error(
        res,
        MESSAGES.ERROR.USER_NOT_FOUND + error.message,
        500,
      );
    }
  },
  addPost: async (data: ICreatePost, res: Response) => {
    const { user_id, image, caption } = data;
    try {
      const newPost = await Posts.create({
        user_id,
        image,
        caption,
      });
      return newPost;
    } catch (error: any) {
      APIResponse.error(
        res,
        MESSAGES.ERROR.POST_CREATION_FAILED + error.message,
        500,
      );
    }
  },

  findPost: async (data: IFindPost, res: Response) => {
    const { post_id } = data;
    try {
      const post = await Posts.findByPk(post_id);
      return post;
    } catch (error: any) {
      APIResponse.error(
        res,
        MESSAGES.ERROR.POST_NOT_FOUND + error.message,
        500,
      );
    }
  },

  updatePost: async (data: IUpdatePost, res: Response) => {
    const { post_id, updatedData } = data;
    try {
      const postdata = await Posts.update(
        { updatedData },
        {
          where: { id: post_id },
        },
      );
      if (postdata) {
        const returndata = await Posts.findOne({
          where: { id: post_id },
        });
        return returndata;
      }
    } catch (error: any) {
      APIResponse.error(
        res,
        MESSAGES.ERROR.POST_UPDATE_FAILED + error.message,
        500,
      );
    }
  },

  deletePost: async (data: IDeletePost, res: any) => {
    const { post_id } = data;
    try {
      const deletePost = await Posts.update(
        { isDelete: true },
        { where: { id: post_id } },
      );
      return deletePost;
    } catch (error) {
      APIResponse.error(
        res,
        MESSAGES.ERROR.POST_DELETION_FAILED,
        500,
      );
    }
  },

  getAllPosts: async (data: IGetAllPost, res: Response) => {
    const { user_id } = data;
    try {
      const posts = await Posts.findAll({
        where: {
          user_id: user_id,
          isDelete: false,
        },
      });
      return posts;
    } catch (error: any) {
      APIResponse.error(
        res,
        MESSAGES.ERROR.POST_NOT_FOUND + error.message,
        500,
      );
    }
  },

  getSinglePost: async (data: IGetSinglePost, res: Response) => {
    const { user_id, post_id } = data;
    try {
      const post = await Posts.findOne({
        where: {
          user_id: user_id,
          id: post_id,
          isDelete: false,
        },
      });
      return post;
    } catch (error: any) {
      APIResponse.error(
        res,
        MESSAGES.ERROR.POST_NOT_FOUND + error.message,
        500,
      );
    }
  },
};

export default postService;
