import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller';
import { validateChunkHeaders } from '../middlewares/upload.middleware';
import { verifyToken } from '../middlewares/auth.middleware';

const uploadRoutes = Router();

uploadRoutes.post(
  '/avatar',
  verifyToken,
  validateChunkHeaders,
  // ✅ Fix: bind để đảm bảo đúng context, an toàn nếu sau này dùng this
  UploadController.uploadAvatar.bind(UploadController),
);
uploadRoutes.post(
  '/review-image',
  validateChunkHeaders,
  UploadController.uploadReviewImage,
);

export default uploadRoutes;
