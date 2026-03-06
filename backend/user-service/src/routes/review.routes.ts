// review.route.ts
import { Router } from 'express';
import multer from 'multer';
import { ReviewController } from '../controllers/review.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Chỉ chấp nhận file ảnh'));
  },
});

// 1. Chỉ upload ảnh
router.post(
  '/images',
  verifyToken,
  upload.array('images', 10),
  ReviewController.uploadImages.bind(ReviewController),
);

// 2. Đánh giá kèm nội dung
router.post(
  '/',
  verifyToken,
  ReviewController.createReview.bind(ReviewController),
);

// 3. Đánh giá kèm nội dung + ảnh
router.post(
  '/with-images',
  verifyToken,
  upload.array('images', 10),
  ReviewController.createReviewWithImages.bind(ReviewController),
);

export default router;
