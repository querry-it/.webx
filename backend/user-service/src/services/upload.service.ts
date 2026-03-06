import path from 'path';
import { UploadRepository } from '../repositories/upload.repository';

export class UploadService {
  static TMP = 'uploads/tmp';
  static FINAL = 'uploads/avatars';
  static FINAL_REVIEW = 'uploads/reviews';
  static MAX_IMAGES = 10;

  static async handleChunk(
    userId: string,
    fileName: string,
    index: number,
    total: number,
    stream: NodeJS.ReadableStream,
  ) {
    // ✅ Fix: validate index và total
    if (index < 0 || total <= 0 || index >= total) {
      throw new Error(`Invalid chunk params: index=${index}, total=${total}`);
    }

    const dir = path.join(this.TMP, userId);

    UploadRepository.ensureDir(dir);

    await UploadRepository.saveChunk(
      UploadRepository.chunkPath(dir, index),
      stream,
    );

    // check đủ chunk chưa
    for (let i = 0; i < total; i++)
      if (!UploadRepository.chunkExists(dir, i)) return { done: false };

    return this.merge(userId, fileName, dir, total);
  }

  static async merge(
    userId: string,
    original: string,
    dir: string,
    total: number,
  ) {
    UploadRepository.ensureDir(this.FINAL);

    const name = UploadRepository.generateFileName(userId, original);
    const finalPath = path.join(this.FINAL, name);

    const write = UploadRepository.createWriteStream(finalPath);

    try {
      for (let i = 0; i < total; i++)
        await UploadRepository.appendChunk(write, dir, i);

      // ✅ Fix: gắn listener TRƯỚC khi gọi end() để tránh race condition
      const finished = new Promise<void>((resolve, reject) => {
        write.on('finish', resolve);
        write.on('error', reject);
      });
      write.end();
      await finished;
    } catch (err) {
      // ✅ Fix: cleanup file dở nếu merge thất bại
      write.destroy();
      UploadRepository.removeDir(finalPath); // xóa file final bị ghi dở
      throw err;
    } finally {
      // ✅ Fix: luôn xóa tmp dir dù thành công hay thất bại
      UploadRepository.removeDir(dir);
    }

    const old = await UploadRepository.getOldAvatar(userId);
    if (old) UploadRepository.deleteOldAvatarFile('uploads', old);

    const dbUrl = `avatars/${name}`;
    await UploadRepository.uploadUserAvatar(userId, dbUrl);

    return { done: true, url: dbUrl };
  }
  // Thêm vào UploadService

  static async handleReviewChunk(
    userId: string,
    reviewId: string,
    fileId: string,
    fileName: string,
    fileOrder: number,
    index: number,
    total: number,
    stream: NodeJS.ReadableStream,
  ) {
    if (index < 0 || total <= 0 || index >= total) {
      throw new Error(`Invalid chunk params: index=${index}, total=${total}`);
    }

    if (fileOrder < 1 || fileOrder > this.MAX_IMAGES) {
      throw new Error(`fileOrder phải từ 1 đến ${this.MAX_IMAGES}`);
    }

    const currentCount = await UploadRepository.countReviewImages(reviewId);
    if (currentCount >= this.MAX_IMAGES) {
      throw new Error(`Bài đánh giá đã đủ ${this.MAX_IMAGES} ảnh`);
    }

    const dir = path.join(this.TMP, userId, reviewId, fileId);
    UploadRepository.ensureDir(dir);

    await UploadRepository.saveChunk(
      UploadRepository.chunkPath(dir, index),
      stream,
    );

    for (let i = 0; i < total; i++)
      if (!UploadRepository.chunkExists(dir, i)) return { done: false };

    return this.mergeReview(
      userId,
      reviewId,
      fileId,
      fileName,
      fileOrder,
      dir,
      total,
    );
  }

  static async mergeReview(
    userId: string,
    reviewId: string,
    fileId: string,
    original: string,
    fileOrder: number,
    dir: string,
    total: number,
  ) {
    const reviewDir = path.join(this.FINAL_REVIEW, reviewId);
    UploadRepository.ensureDir(reviewDir);

    const name = UploadRepository.generateFileName(userId, original);
    const finalPath = path.join(reviewDir, name);
    const write = UploadRepository.createWriteStream(finalPath);

    try {
      for (let i = 0; i < total; i++)
        await UploadRepository.appendChunk(write, dir, i);

      const finished = new Promise<void>((resolve, reject) => {
        write.on('finish', resolve);
        write.on('error', reject);
      });
      write.end();
      await finished;
    } catch (err) {
      write.destroy();
      UploadRepository.removeDir(finalPath);
      throw err;
    } finally {
      UploadRepository.removeDir(dir);
    }

    const dbUrl = `reviews/${reviewId}/${name}`;
    await UploadRepository.saveReviewImage(reviewId, dbUrl, fileOrder);

    return { done: true, url: dbUrl };
  }
}
