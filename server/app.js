// server/app.js
import 'dotenv/config'; // Load environment variables
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();

// Connect to MongoDB
import connectDB from './config/db.js';
connectDB();

// Middleware
// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000', // Allow local development
  'https://ide-x.vercel.app', // Frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies and authorization headers
  })
);
app.use(express.json());

// Session Middleware (required for Passport.js)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session expires after 24 hours
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
