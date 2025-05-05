import { Router } from 'express';
import { addLike, getLikes } from '../controller/likesController.js';
import { LikeRoutes } from '../utils/ENUMS/routesEnum.js';

const router = Router();

router.post(LikeRoutes.ADD_LIKE, addLike);
router.get(LikeRoutes.GET_LIKES, getLikes);

export default router;
