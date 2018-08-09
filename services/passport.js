const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  try {
    const existingUser = await User.findById(id);
    done(null, existingUser);
  } catch (err) {
    done(err, null);
  }
})

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const existingUser = await User.findOne({ username })

    if (!existingUser)
      return done(null, false, { message: 'Incorrect username' });

    const isValidPassword = await bcrypt.compare(password, existingUser.password);

    if(!isValidPassword)
      return done(null, false, { message: 'Invalid password' });
    
    return done(null, existingUser);
  } catch (err) {
    return done(err);
  }
}));