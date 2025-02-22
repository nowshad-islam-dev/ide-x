// server/routes/ snippet.route.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

// Load Snippet Model and User Model
import Snippet from '../models/snippet.model.js';
import User from '../models/user.model.js';

import {
  createSnippet,
  editSnippet,
  getSnippets,
  getOneSnippet,
  deleteSnippet,
} from '../controllers/snippet.controller.js';

const router = express.Router();

// Create a snippet
router.post('/', protect, createSnippet);

// Get all snippets of a user
router.get('/', protect, getSnippets, editSnippet);

// Get one specific snippet
router.get('/:id', protect, getOneSnippet);

// Edit a snippet with specific id
router.put('/:id', protect, editSnippet);

// Delete a snippet with specific id
router.delete('/:id', protect, deleteSnippet);

export default router;
