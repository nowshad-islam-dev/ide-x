// server/models/Snippet.js
import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      default: '', // Allow empty string
    },
    css: {
      type: String,
      default: '',
    },
    js: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Snippet = mongoose.model('Snippet', snippetSchema);

export default Snippet;
