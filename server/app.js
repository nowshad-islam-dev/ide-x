// server/app.js
import 'dotenv/config'; // Load environment variables
import express from 'express';
import cors from 'cors';
import passport from 'passport';

const app = express();

// Connect to MongoDB
import connectDB from './config/db.js';
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
import authRoutes from './routes/auth.route.js';
import snippetRoutes from './routes/snippet.route.js';
app.use('/api/auth', authRoutes);
app.use('/api/snippet', snippetRoutes);

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
