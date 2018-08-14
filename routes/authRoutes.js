const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = mongoose.model('users');
//test comments
module.exports = app => {
  app.post('/api/auth/register', async (req, res) => {
    const {
      username,
      email,
      password
    } = req.body

    const existingUser = await User.findOne({ username });

    if (existingUser)
      return res.send({ message: 'The username is in use. Please try with other one.'});            

    const hashedPass = await bcrypt.hash(password, 8);

    try {
      const newUser = await User.create({
        username,
        email,
        password: hashedPass
      })
  
      return res.status(200).send(newUser);
    } catch (err) {
      return res.status(500).send({ message: 'There was an error creating a user'});
    }    
  });

  app.post('/api/auth/login', passport.authenticate('local', {
    successRedirect: '/',
    failuredRedirect: '/error'    
  }));

  app.get("/api/auth/current_user", (req, res) => {
    if (!req.user)
      return res.send(req.user);

    const { user } = req.user;

    return res.send(user);
  });

  app.get('/api/auth/logout', (req, res) => {
    req.logout();
    req.redirect('/');
  })
};
