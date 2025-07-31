import express from 'express';
import { register, login, verifyEmail, requestPasswordReset, resetPassword, resendVerificationEmail, logout } from '../controllers/authController.js';
import { authorize, protect } from '../middlewares/auth.js';
import { createUserSchema } from '../validations/userValidation.js';
import { validate } from '../middlewares/validate.js';


const router = express.Router();

router.post('/login', login);
router.get('/verify/:token', verifyEmail);

router.post('/password-reset-request', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);
router.post('/register', validate(createUserSchema), register);
router.post("/resend-verification", resendVerificationEmail);
router.post("/logout", logout)

router.get('/user-profile', protect, (req, res) => {
  res.json({ message: `Bienvenue ${req.user.name}` });
});

router.get('/admin-panel', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Bienvenue dans le panneau admin' });
 
});

router.get('/moderator-section', protect, authorize('moderator', 'admin'), (req, res) => {
  res.json({ message: 'Bienvenue dans la section modérateur' });
});

export default router;
