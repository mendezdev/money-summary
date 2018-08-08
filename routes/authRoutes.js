const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = app => {
  app.post('/api/auth/login', async (req, res) => {
    const {
      username,
      email,
      password
    } = req.body

    try {
      const newUser = await User.create({
        username,
        email,
        password
      })
  
      return res.send(newUser);
    } catch (err) {
      return res.status(500).send({ message: 'There was an error creating a user'});
    }    
  })

  app.get("/api/auth/current_user", (req, res) => {
    return res.send({ username: "Pablo", password: "1234" });
  });
};
