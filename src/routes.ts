import { Router } from 'express';
import AuthController from './controllers/authController';

const router = Router();
const authController = new AuthController();
router.post('/signup', authController.signUp.bind(authController));
router.post('/login', authController.login.bind(authController));
// router.post('/logout', AuthController.logout);
// router.get('/user', AuthController.getUserData);

export default router;
