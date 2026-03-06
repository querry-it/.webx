import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import jwt from 'jsonwebtoken';
import { REFRESH_SECRET_KEY } from '../constants/auth.constant';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const user = req.body;
      const newUser = await AuthService.register(user);
      return res.status(201).json({
        success: true,
        message: 'Tạo tài khoản thành công.',
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const user = req.body;
      const { userid, accessToken, refreshToken } = await AuthService.login(
        user.username,
        user.password,
      );

      res.cookie('next-auth.rftk', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công.',
        data: {
          userId: userid,
          accessToken: accessToken,
        },
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
  static async forgot(req: Request, res: Response) {
    try {
      const user = req.body;
      const result = await AuthService.forgot(user.code, user.username);
      return res.status(200).json({
        success: true,
        message: 'Tìm kiếm tài khoản thành công.',
        data: {
          userid: result.userid,
        },
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
  static async reset(req: Request, res: Response) {
    try {
      const user = req.body;
      const result = await AuthService.reset(user.userid, user.password);
      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
  static async refreshToken(req: Request, res: Response) {
    const refresh = req.cookies?.['next-auth.rftk'];
    if (!refresh)
      return res.status(400).json({
        success: false,
        message: 'Token không tồn tại',
      });

    try {
      const result = await AuthService.refreshToken(refresh);
      return res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công.',
        data: {
          userId: result.userId,
          accessToken: result.accessToken,
        },
      });
    } catch (err: any) {
      return res.status(403).json({
        success: false,
        message: err.message,
      });
    }
  }
  static async requestForgot(req: Request, res: Response) {
    req.session.allowForgot = true;

    return res.status(200).json({
      success: true,
      message: 'Đã cấp quyền tới quên mật khẩu.',
    });
  }
  static async requestRegister(req: Request, res: Response) {
    req.session.allowRegister = true;

    return res.status(200).json({
      success: true,
      message: 'Đã cấp quyền tới quên mật khẩu.',
    });
  }
  static async requestReset(req: Request, res: Response) {
    req.session.allowReset = true;

    return res.status(200).json({
      success: true,
      message: 'Đã cấp quyền tới quên mật khẩu.',
    });
  }
  static async accessForgot(req: Request, res: Response) {
    if (req.session?.allowForgot) {
      return res.status(200).json({
        success: true,
        message: 'Đã cấp quyền tới quên mật khẩu.',
      });
    }
    return res.status(404).json({
      success: false,
      message: 'Không có quyền tới quên mật khẩu.',
    });
  }
  static async accessRegister(req: Request, res: Response) {
    if (req.session?.allowRegister) {
      return res.status(200).json({
        success: true,
        message: 'Đã cấp quyền tới quên mật khẩu.',
      });
    }
    return res.status(404).json({
      success: false,
      message: 'Không có quyền tới quên mật khẩu.',
    });
  }
  static async accessReset(req: Request, res: Response) {
    if (req.session?.allowReset) {
      return res.status(200).json({
        success: true,
        message: 'Đã cấp quyền tới quên mật khẩu.',
      });
    }
    return res.status(404).json({
      success: false,
      message: 'Không có quyền tới quên mật khẩu.',
    });
  }
  static async accessHome(req: Request, res: Response) {
    const refresh = req.cookies?.['next-auth.rftk'];
    if (!refresh) {
      return res
        .status(404)
        .json({ success: false, message: 'Chưa đăng nhập.' });
    }

    try {
      jwt.verify(refresh, REFRESH_SECRET_KEY);
      return res
        .status(200)
        .json({ success: true, message: 'Đã cấp quyền vào home.' });
    } catch {
      return res
        .status(404)
        .json({ success: false, message: 'Phiên đăng nhập hết hạn.' });
    }
  }
  static async clearLogin(req: Request, res: Response) {
    req.session.allowRegister = false;
    req.session.allowForgot = false;
    req.session.allowReset = false;
    req.session.allowHome = false;

    return res.status(200).json({
      success: true,
      message: 'Dọn dẹp cờ thành công.',
    });
  }
  static async clearForgot(req: Request, res: Response) {
    req.session.allowReset = false;

    return res.status(200).json({
      success: true,
      message: 'Dọn dẹp cờ thành công.',
    });
  }
  static async getInfo(req: Request, res: Response) {
    const { userid } = req.params;
    try {
      const result = await AuthService.getInfo(userid);
      return res.status(200).json({
        success: true,
        message: 'Lấy thông tin tài khoản thành công.',
        data: {
          code: result.code,
          username: result.username,
          fullname: result.fullname,
          avatar_url: result.avatar_url,
        },
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
  static async logout(req: Request, res: Response) {
    try {
      res.clearCookie('next-auth.rftk', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      });

      return res.status(200).json({
        success: true,
        message: 'Đăng xuất thành công',
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: 'Logout thất bại',
      });
    }
  }
  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId)
        return res
          .status(401)
          .json({ success: false, message: 'Unauthorized' });

      const { fullname, username } = req.body;
      if (!fullname || !username)
        return res
          .status(400)
          .json({ success: false, message: 'Thiếu thông tin.' });

      const result = await AuthService.updateProfile(
        userId,
        fullname,
        username,
      );
      return res.status(200).json({
        success: true,
        message: 'Cập nhật hồ sơ thành công.',
        data: result,
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }
}
