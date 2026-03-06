import path from 'path';
import { Request, Response, NextFunction } from 'express';

const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp'];
const MAX_CHUNK_SIZE = 5 * 1024 * 1024; // ✅ Giới hạn 5MB mỗi chunk

export const validateChunkHeaders = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // ✅ Kiểm tra kích thước chunk
  const contentLength = Number(req.headers['content-length']);
  if (!contentLength || contentLength > MAX_CHUNK_SIZE) {
    return res.status(413).json({
      success: false,
      message: 'Chunk quá lớn, tối đa 5MB',
    });
  }

  const name = req.headers['x-file-name'];
  const index = req.headers['x-chunk-index'];
  const total = req.headers['x-total-chunks'];

  if (!name || !index || !total) {
    return res.status(400).json({
      success: false,
      message: 'Thiếu header upload',
    });
  }

  // ✅ Fix: validate extension để tránh upload file nguy hiểm
  const ext = path.extname(name as string).toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) {
    return res.status(400).json({
      success: false,
      message: `Định dạng file không hợp lệ. Chỉ chấp nhận: ${ALLOWED_EXT.join(', ')}`,
    });
  }

  const i = Number(index);
  const t = Number(total);

  // ✅ Fix: thêm i >= t để tránh index vượt quá total
  if (Number.isNaN(i) || Number.isNaN(t) || i < 0 || t <= 0 || i >= t) {
    return res.status(400).json({
      success: false,
      message: 'Header chunk không hợp lệ',
    });
  }

  next();
};
