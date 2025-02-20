// server/config/passport.js
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

// Load User Model
import User from '../models/user.model.js';

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'api/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        let user = await User.findOne({ githubId: profile.id });
        if (user) {
          return done(null, user);
        }

        // Create a new user
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          githubId: profile.id,
          avatar: profile.photos[0].value,
        });
        await user.save();

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
