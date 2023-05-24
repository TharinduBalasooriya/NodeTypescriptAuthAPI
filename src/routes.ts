import { Router } from 'express';
import AuthController from './controllers/authController';
import { authMiddleware } from './middlerware/authMiddleware';

const router = Router();
const authController = new AuthController();
router.post('/signup', authController.signUp.bind(authController));
router.post('/login', authController.login.bind(authController));
router.get('/users/:id',authMiddleware, authController.getUserData.bind(authController));
// router.post('/logout', AuthController.logout);


export default router;
