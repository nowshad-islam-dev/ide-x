// server/app.js
import 'dotenv/config'; // Load environment variables
import express from 'express';
import cors from 'cors';

const app = express();

// Connect to MongoDB
import connectDB from './config/db.js';
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the CodePen Clone API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
