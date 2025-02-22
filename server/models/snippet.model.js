// server/models/Snippet.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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
    shareableId: {
      type: String,
      unique: true, // Generate a unique shareable ID for each snippet
      default: () => uuidv4(),
    },
  },
  { timestamps: true }
);

const Snippet = mongoose.model('Snippet', snippetSchema);

export default Snippet;
