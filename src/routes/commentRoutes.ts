import Routes from 'express';
import {
  addComment,
  getComment,
  deleteComment,
  updateComment,
} from '../controller/commentController.js';
import { CommentRoutes } from '../utils/ENUMS/routesEnum.js';

const router = Routes();

router.post(CommentRoutes.ADD_COMMENT, addComment);
router.get(CommentRoutes.GET_COMMENT, getComment);
router.patch(CommentRoutes.DELETE_COMMENT, deleteComment);
router.patch(CommentRoutes.UPDATE_COMMENT, updateComment);
export default router;
