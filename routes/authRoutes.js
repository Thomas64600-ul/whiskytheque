import express from 'express';
import { register, login, verifyUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

router.post('/register', register);
router.post('/login', login);


router.get('/verify/:token', verifyUser);

export default router;