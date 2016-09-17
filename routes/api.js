import express from 'express';
import * as authController from '../controller/authController';

let router = express.Router();

router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.get('/auth/forgotPassword', authController.forgotPassword);
router.get('/auth/resetPassword', authController.resetPassword);
router.get('/protected', authController.protectedRoute);

export default router;
