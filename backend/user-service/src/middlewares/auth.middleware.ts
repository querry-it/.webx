import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
  ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY,
} from '../constants/auth.constant';

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { code, username, password, confirm } = req.body;

  const codeRegex = /^[a-zA-Z0-9]{12}$/;
  const userRegex = /^[a-z0-9._-]{8,20}$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/;

  if (!code || !username || !password || !confirm) {
    return res.status(400).json({
      success: false,
      message: 'Thông tin nhập chưa đầy đủ.',
    });
  }

  const c = code.trim();
  const u = username.trim();

  if (!codeRegex.test(c))
    return res.status(400).json({
      success: false,
      message: 'Định dạng của mã giới thiệu chưa chính xác.',
    });

  if (!userRegex.test(u))
    return res.status(400).json({
      success: false,
      message: 'Định dạng của tài khoản chưa chính xác.',
    });

  if (!passRegex.test(password))
    return res.status(400).json({
      success: false,
      message: 'Định dạng của mật khẩu chưa chính xác.',
    });

  if (password !== confirm)
    return res
      .status(400)
      .json({ error: 'Mật khẩu nhập lại phải giống mật khẩu.' });

  req.body.code = c;
  req.body.username = u;

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;
  const userRegex = /^[a-z0-9._-]{8,20}$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/;

  const u = username.trim();
  const p = password.trim();

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Thông tin nhập chưa đầy đủ.',
    });
  }

  if (!userRegex.test(u))
    return res.status(400).json({
      success: false,
      message: 'Định dạng của tài khoản chưa chính xác.',
    });

  if (!passRegex.test(p))
    return res.status(400).json({
      success: false,
      message: 'Định dạng của mật khẩu chưa chính xác.',
    });

  req.body.username = u;
  req.body.password = p;

  next();
};

export const validateForgot = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { code, username } = req.body;

  const codeRegex = /^[a-zA-Z0-9]{12}$/;
  const userRegex = /^[a-z0-9._-]{8,20}$/;

  if (!code || !username) {
    return res.status(400).json({
      success: false,
      message: 'Thông tin nhập chưa đầy đủ.',
    });
  }

  const c = code.trim();
  const u = username.trim();

  if (!codeRegex.test(c))
    return res.status(400).json({
      success: false,
      message: 'Định dạng của mã giới thiệu chưa chính xác.',
    });

  if (!userRegex.test(u))
    return res.status(400).json({
      success: false,
      message: 'Định dạng của tài khoản chưa chính xác.',
    });

  req.body.code = c;
  req.body.username = u;

  next();
};

export const validateReset = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userid, password } = req.body;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!userid || !password) {
    return res.status(400).json({
      success: false,
      message: 'Thông tin nhập chưa đầy đủ.',
    });
  }

  const u = userid.trim();
  const p = password.trim();

  if (!uuidRegex.test(u))
    return res.status(400).json({
      success: false,
      message: 'Mã định danh không tồn tại.',
    });

  if (!passRegex.test(p))
    return res.status(400).json({
      success: false,
      message: 'Định dạng của mật khẩu chưa chính xác.',
    });

  req.body.userid = u;
  req.body.password = p;

  next();
};

interface JwtPayload {
  userId: string;
  username: string;
}

function isUUID(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id,
  );
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res
        .status(401)
        .json({ success: false, message: 'Không có token' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, ACCESS_SECRET_KEY) as JwtPayload;

    // ✅ Fix: check đúng field userId thay vì username
    if (!decoded.userId)
      return res
        .status(401)
        .json({ success: false, message: 'Thông tin không đầy đủ.' });

    // ✅ Fix: map userId → id để controller đọc được req.user.id
    (req as any).user = { id: decoded.userId };

    next();
  } catch {
    return res
      .status(401)
      .json({ success: false, message: 'Token không hợp lệ hoặc hết hạn' });
  }
}

export const validateProfile = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { fullname, username } = req.body;

  const nameRegex = /^[A-Za-zÀ-ỹ]{2,16}(?: [A-Za-zÀ-ỹ]+)*$/;
  const userRegex = /^[a-zA-Z0-9._-]{8,20}$/;

  if (!fullname || !username) {
    return res.status(400).json({
      success: false,
      message: 'Vui lòng nhập đầy đủ các thông tin.',
    });
  }

  const f = fullname.trim();
  const u = username.trim();

  if (!f || !u) {
    return res.status(400).json({
      success: false,
      message: 'Vui lòng nhập đầy đủ các thông tin.',
    });
  }

  if (!nameRegex.test(f)) {
    return res.status(400).json({
      success: false,
      message: 'Họ tên không đúng định dạng.',
    });
  }

  if (!userRegex.test(u)) {
    return res.status(400).json({
      success: false,
      message: 'Tài khoản không đúng định dạng.',
    });
  }

  req.body.fullname = f;
  req.body.username = u;

  next();
};
