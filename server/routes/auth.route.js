// server/routes/auth.route.js
import express from 'express';
import passport from 'passport';

const router = express.Router();

import {
  registerUser,
  loginUser,
  getGithubOAuth,
} from '../controllers/auth.controller.js';

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

export default router;
