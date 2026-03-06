import { Router } from 'express';
import {
  validateForgot,
  validateLogin,
  validateRegister,
  validateReset,
  validateProfile,
  verifyToken,
} from '../middlewares/auth.middleware';
import { AuthController } from '../controllers/auth.controller';
const authRoutes = Router();

authRoutes.post('/login', validateLogin, AuthController.login);
authRoutes.post('/register', validateRegister, AuthController.register);
authRoutes.post('/forgot-password', validateForgot, AuthController.forgot);
authRoutes.post('/reset-password', validateReset, AuthController.reset);
authRoutes.post('/refresh', AuthController.refreshToken);
authRoutes.post('/logout', AuthController.logout);
authRoutes.post('/request-forgot', AuthController.requestForgot);
authRoutes.post('/request-reset', AuthController.requestReset);
authRoutes.post('/request-register', AuthController.requestRegister);
authRoutes.post('/clear-login', AuthController.clearLogin);
authRoutes.post('/clear-forgot', AuthController.clearForgot);
authRoutes.get('/get-info/:userid', verifyToken, AuthController.getInfo);
authRoutes.get('/can-access-forgot', AuthController.accessForgot);
authRoutes.get('/can-access-reset', AuthController.accessReset);
authRoutes.get('/can-access-register', AuthController.accessRegister);
authRoutes.get('/can-access-home', AuthController.accessHome);
authRoutes.patch(
  '/profile',
  verifyToken,
  validateProfile,
  AuthController.updateProfile,
);

export default authRoutes;
