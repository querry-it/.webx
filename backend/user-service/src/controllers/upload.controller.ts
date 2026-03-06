import { Response } from 'express';
import { UploadService } from '../services/upload.service';
import { AuthRequest } from '../types/upload.type';

export class UploadController {
  static async uploadAvatar(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;

      // ✅ Fix: validate userId
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      // ✅ Header đã được validateChunkHeaders middleware kiểm tra rồi, không cần validate lại
      const file = req.headers['x-file-name'] as string;
      const index = Number(req.headers['x-chunk-index']);
      const total = Number(req.headers['x-total-chunks']);

      const result = await UploadService.handleChunk(
        userId,
        file,
        index,
        total,
        req,
      );

      res.json({
        success: true,
        message: result.done ? 'Upload hoàn tất' : 'Chunk OK',
        data: result,
      });
    } catch (err) {
      // ✅ Fix: log lỗi để dễ debug, không nuốt error
      console.error('[UploadController] uploadAvatar error:', err);
      res.status(500).json({
        success: false,
        message: 'Upload lỗi',
      });
    }
  }
  static async uploadReviewImage(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const file = req.headers['x-file-name'] as string;
      const index = Number(req.headers['x-chunk-index']);
      const total = Number(req.headers['x-total-chunks']);
      const fileId = req.headers['x-file-id'] as string;
      const reviewId = req.headers['x-review-id'] as string;
      const fileOrder = Number(req.headers['x-file-order']);

      if (!fileId || !reviewId || !fileOrder) {
        res
          .status(400)
          .json({
            success: false,
            message: 'Thiếu x-file-id, x-review-id hoặc x-file-order',
          });
        return;
      }

      const result = await UploadService.handleReviewChunk(
        userId,
        reviewId,
        fileId,
        file,
        fileOrder,
        index,
        total,
        req,
      );

      res.json({
        success: true,
        message: result.done ? 'Upload hoàn tất' : 'Chunk OK',
        data: result,
      });
    } catch (err) {
      console.error('[UploadController] uploadReviewImage error:', err);
      res.status(500).json({ success: false, message: 'Upload lỗi' });
    }
  }
}
