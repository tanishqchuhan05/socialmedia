import Router from 'express';
import {
  addPost,
  updatePost,
  deletePost,
  getAllPosts,
  getSinglePost,
} from '../controller/postController.js';
import { PostRoutes } from './indexRoutes.js';

const router = Router();

router.post(PostRoutes.ADD_POST, addPost);
router.patch(PostRoutes.UPDATE_POST, updatePost);
router.patch(PostRoutes.DELETE_POST, deletePost);
router.get(PostRoutes.GET_ALL_POSTS, getAllPosts);
router.get(PostRoutes.GET_SINGLE_POST, getSinglePost);

export default router;
