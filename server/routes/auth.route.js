// server/routes/auth.route.js
import express from 'express';
import passport from '../config/passport.js';
import { check } from 'express-validator';

const router = express.Router();

import {
  registerUser,
  loginUser,
  getGithubOAuth,
  sendResetEmailToUser,
  resetPassword,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/authMiddleware.js';

// Load User Model
import User from '../models/user.model.js';

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    // Validate email format
    check('email', 'Please include a valid email').isEmail(),

    // Validate pasword strength
    check(
      'password',
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
    ).matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'i'
    ),
  ],
  registerUser
);

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post(
  '/forgot-password',
  [
    check(
      'password',
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
    ).matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'i'
    ),
  ],
  sendResetEmailToUser
);

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password
// @access  Public
router.post('/reset-password/:token', resetPassword);

// Login user
router.post('/login', loginUser);

// GitHub OAuth
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  })
);

// GitHub OAuth callback
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  getGithubOAuth
);

router.get('/me', protect, async (req, res) => {
  try {
    // req.user is set in the protect middleware
    // it refers to the user id in the token
    const user = await User.findById(req.user).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
