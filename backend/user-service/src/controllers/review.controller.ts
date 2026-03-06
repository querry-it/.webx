// review.controller.ts
import { Response } from 'express';
import { ReviewRepository } from '../repositories/review.repository';
import { UploadRepository } from '../repositories/upload.repository';
import { AuthRequest } from '../types/upload.type';
import path from 'path';
import fs from 'fs';

export class ReviewController {
  static FINAL_REVIEW = 'uploads/reviews';

  // ── 1. Chỉ upload ảnh (chưa có nội dung) ───────────────
  static async uploadImages(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const locationId = req.body.location_id;
      const files = req.files as Express.Multer.File[];

      if (!userId)
        return res
          .status(401)
          .json({ success: false, message: 'Unauthorized' });
      if (!locationId)
        return res
          .status(400)
          .json({ success: false, message: 'Thiếu location_id' });
      if (!files?.length)
        return res
          .status(400)
          .json({ success: false, message: 'Không có ảnh' });
      if (files.length > 10)
        return res
          .status(400)
          .json({ success: false, message: 'Tối đa 10 ảnh' });

      // Tạo review nháp để có reviewId
      const review = await ReviewRepository.createDraft(userId, locationId);
      const imageUrls = await ReviewController.saveImages(
        files,
        review.id,
        userId,
      );

      res.status(201).json({
        success: true,
        message: 'Upload ảnh thành công',
        data: { review_id: review.id, images: imageUrls },
      });
    } catch (err) {
      console.error('[ReviewController] uploadImages error:', err);
      res.status(500).json({ success: false, message: 'Lỗi upload ảnh' });
    }
  }

  // ── 2. Đánh giá kèm nội dung (không có ảnh) ────────────
  static async createReview(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const locationId = req.body.location_id;
      const rating = Number(req.body.rating);
      const content = req.body.content;

      if (!userId)
        return res
          .status(401)
          .json({ success: false, message: 'Unauthorized' });
      if (!locationId)
        return res
          .status(400)
          .json({ success: false, message: 'Thiếu location_id' });
      if (!rating || rating < 1 || rating > 5)
        return res
          .status(400)
          .json({ success: false, message: 'Rating không hợp lệ (1-5)' });
      if (!content?.trim())
        return res
          .status(400)
          .json({ success: false, message: 'Thiếu nội dung' });

      const review = await ReviewRepository.create(
        userId,
        locationId,
        rating,
        content,
      );
      await ReviewRepository.updateLocationRating(locationId);

      res.status(201).json({
        success: true,
        message: 'Đánh giá thành công',
        data: { ...review, images: [] },
      });
    } catch (err) {
      console.error('[ReviewController] createReview error:', err);
      res.status(500).json({ success: false, message: 'Lỗi tạo đánh giá' });
    }
  }

  // ── 3. Đánh giá kèm nội dung + ảnh ─────────────────────
  static async createReviewWithImages(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const locationId = req.body.location_id;
      const rating = Number(req.body.rating);
      const content = req.body.content;
      const files = req.files as Express.Multer.File[];

      if (!userId)
        return res
          .status(401)
          .json({ success: false, message: 'Unauthorized' });
      if (!locationId)
        return res
          .status(400)
          .json({ success: false, message: 'Thiếu location_id' });
      if (!rating || rating < 1 || rating > 5)
        return res
          .status(400)
          .json({ success: false, message: 'Rating không hợp lệ (1-5)' });
      if (!content?.trim())
        return res
          .status(400)
          .json({ success: false, message: 'Thiếu nội dung' });
      if (!files?.length)
        return res
          .status(400)
          .json({ success: false, message: 'Không có ảnh' });
      if (files.length > 10)
        return res
          .status(400)
          .json({ success: false, message: 'Tối đa 10 ảnh' });

      const review = await ReviewRepository.create(
        userId,
        locationId,
        rating,
        content,
      );
      await ReviewRepository.updateLocationRating(locationId);
      const imageUrls = await ReviewController.saveImages(
        files,
        review.id,
        userId,
      );

      res.status(201).json({
        success: true,
        message: 'Đánh giá thành công',
        data: { ...review, images: imageUrls },
      });
    } catch (err) {
      console.error('[ReviewController] createReviewWithImages error:', err);
      res.status(500).json({ success: false, message: 'Lỗi tạo đánh giá' });
    }
  }

  // ── Helper: lưu ảnh ─────────────────────────────────────
  private static async saveImages(
    files: Express.Multer.File[],
    reviewId: string,
    userId: string,
  ): Promise<string[]> {
    const reviewDir = path.join(ReviewController.FINAL_REVIEW, reviewId);
    fs.mkdirSync(reviewDir, { recursive: true });

    const imageUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const name = UploadRepository.generateFileName(userId, file.originalname);
      const filePath = path.join(reviewDir, name);

      fs.writeFileSync(filePath, file.buffer);

      const dbUrl = `reviews/${reviewId}/${name}`;
      await ReviewRepository.saveImage(reviewId, dbUrl, i + 1);
      imageUrls.push(dbUrl);
    }

    return imageUrls;
  }
}
