import { Request } from 'express'; // ✅ Fix: import đúng Request từ express

// ✅ Type riêng cho user, dễ mở rộng sau
export interface AuthUser {
  id: string;
  // thêm role, email,... ở đây nếu cần
}

// Dùng trong controller để type-safe khi đọc headers
export interface UploadChunkHeaders {
  'x-file-name': string;
  'x-chunk-index': string;
  'x-total-chunks': string;
}

// ✅ Fix: extend đúng Express Request
export interface AuthRequest extends Request {
  user?: AuthUser;
  headers: Request['headers'] & UploadChunkHeaders; // ✅ Gắn UploadChunkHeaders vào headers để dùng được trong controller
}
