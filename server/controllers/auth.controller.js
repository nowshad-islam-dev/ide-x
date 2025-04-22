// server/controllers/auth.controller.js
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

// helper funnction
import sendResetEmail from '../helpers/sendMail.js';

// Load User Model
import User from '../models/user.model.js';

// Register a new user
export const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user exists already
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    user = new User({ name, email, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);

    res.status(500).send('Server Error');
  }
};

export const sendResetEmailToUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ message: 'No account with that email found' });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Save the token and expiration time to user document
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hour in ms
  await user.save();

  // Create the reset URL
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  // Send the email
  sendResetEmail(email, resetUrl);
  res.json({ message: 'Password reset email sent' });
  try {
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const resetPassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Store the new password
    user.password = password;

    // Clear rest token and expiration from user
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: 'Password reset successfull' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// GitHub OAuth callback
export const getGithubOAuth = async (req, res) => {
  // Generate JWT token
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.redirect(`https://ide-x.vercel.app?token=${token}`);
};
