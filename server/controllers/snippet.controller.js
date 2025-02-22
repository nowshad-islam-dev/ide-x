// server/controllers/ snippet.controller.js

// Load Snippet Model and User Model
import Snippet from '../models/snippet.model.js';
import User from '../models/user.model.js';

export const createSnippet = async (req, res) => {
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
};

export const getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user });
    res.json(snippets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getOneSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Ensure the snippet belongs to the logged-in user
    if (req.user.toString() !== snippet.user.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(snippet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const editSnippet = async (req, res) => {
  const { title, html, css, js } = req.body;

  // Check if at least one of the code fields is non-empty
  if (!html.trim() && !css.trim() && !js.trim()) {
    return res.status(400).json({
      message: 'At least one code field (HTML, CSS, JS) must be filled.',
    });
  }

  try {
    const updatedSnippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      { title, html, css, js },
      { new: true }
    );

    if (!updatedSnippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Ensure the snippet belongs to the logged-in user
    if (snippet.user.toString() !== req.user.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Remove the snippet from the database
    await Snippet.deleteOne({ _id: snippet._id });

    // Remove the snippet ID from the user's snippets array
    await User.findByIdAndUpdate(
      req.user,
      {
        $pull: { snippets: req.params.id },
      },
      { new: true }
    );

    res.json({ message: 'Snippet deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
