import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto'; // built-in Node.js, không cần cài
import pool from '../config/db';

export class UploadRepository {
  static ensureDir(dir: string) {
    const full = path.resolve(dir);

    if (!fs.existsSync(full)) {
      fs.mkdirSync(full, { recursive: true });
    }
  }

  static chunkPath(dir: string, index: number) {
    return path.join(dir, `chunk-${index}`);
  }

  static chunkExists(dir: string, index: number) {
    return fs.existsSync(this.chunkPath(dir, index));
  }

  // ✅ Fix: thêm stream.on('error', reject) để tránh file chunk bị ghi dở
  static saveChunk(filePath: string, stream: NodeJS.ReadableStream) {
    return new Promise((resolve, reject) => {
      const write = fs.createWriteStream(filePath);
      stream.pipe(write);
      write.on('finish', resolve);
      write.on('error', (err) => {
        fs.unlink(filePath, () => {}); // xóa file dở nếu lỗi
        reject(err);
      });
      stream.on('error', (err) => {
        fs.unlink(filePath, () => {}); // xóa file dở nếu stream lỗi
        reject(err);
      });
    });
  }

  static async appendChunk(write: fs.WriteStream, dir: string, index: number) {
    return new Promise((resolve, reject) => {
      const read = fs.createReadStream(this.chunkPath(dir, index));
      read.on('end', resolve);
      read.on('error', reject);
      read.pipe(write, { end: false });
    });
  }

  static removeDir(dir: string) {
    fs.rmSync(dir, { recursive: true, force: true });
  }

  // ✅ Fix: thêm randomUUID() để tránh trùng tên khi nhiều request cùng lúc
  static generateFileName(userId: string, original: string) {
    const ext = path.extname(original);
    return `${userId}-${Date.now()}-${randomUUID()}${ext}`;
  }

  static createWriteStream(pathFile: string) {
    return fs.createWriteStream(pathFile);
  }

  static async uploadUserAvatar(userId: string, url: string) {
    await pool.query(`UPDATE users SET avatar_url=$1 WHERE id=$2`, [
      url,
      userId,
    ]);
  }

  static async getOldAvatar(userId: string) {
    const r = await pool.query(`SELECT avatar_url FROM users WHERE id=$1`, [
      userId,
    ]);
    return r.rows[0]?.avatar_url || null;
  }

  // ✅ Fix: normalize url để tránh lỗi path khi url có dạng '/uploads/avatar.png'
  static deleteOldAvatarFile(root: string, url: string) {
    const normalizedUrl = url.replace(/^\//, '');
    const p = path.join(root, normalizedUrl);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }

  static async countReviewImages(reviewId: string): Promise<number> {
    const result = await pool.query(
      `SELECT COUNT(*) FROM review_images WHERE review_id = $1`,
      [reviewId],
    );
    return parseInt(result.rows[0].count);
  }

  static async saveReviewImage(
    reviewId: string,
    url: string,
    sortOrder: number,
  ): Promise<void> {
    await pool.query(
      `INSERT INTO review_images (id, review_id, url, sort_order)
     VALUES (gen_random_uuid(), $1, $2, $3)`,
      [reviewId, url, sortOrder],
    );
  }
}
