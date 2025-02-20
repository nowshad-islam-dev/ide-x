// server/routes/auth.route.js
import express from 'express';
import passport from 'passport';

const router = express.Router();

import {
  registerUser,
  loginUser,
  getGithubOAuth,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/authMiddleware.js';

// Load User Model
import User from '../models/user.model.js';

// Register a new user
router.post('/register', registerUser);

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

router.get('/me', protect, (req, res) => {
  try {
    // req.user is set in the protect middleware
    // it refers to the user id in the token
    const user = User.findById(req.user).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
