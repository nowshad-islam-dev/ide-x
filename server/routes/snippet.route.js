// server/routes/ snippet.route.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

// Load Snippet Model and User Model
import Snippet from '../models/snippet.model.js';
import User from '../models/user.model.js';

const router = express.Router();

// create a snippet with a title
router.post('/', protect, async (req, res) => {
  const { title, html, css, js } = req.body;

  // Check if at least one of the code fields is non-empty
  if (!html.trim() && !css.trim() && !js.trim()) {
    return res.status(400).json({
      message: 'At least one code field (HTML, CSS, JS) must be filled.',
    });
  }

  try {
    const snippet = new Snippet({
      user: req.user,
      title,
      html,
      css,
      js,
    });

    const savedSnippet = await snippet.save();

    // Add the snippet ID to the user's snippets array
    await User.findByIdAndUpdate(req.user, {
      $push: { snippets: savedSnippet._id },
    });

    res.status(201).json(snippet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all snippets for a user
router.get('/', protect, async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user });
    res.json(snippets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
