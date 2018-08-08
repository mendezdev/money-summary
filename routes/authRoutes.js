module.exports = app => {
  app.post('/api/auth/login', (req, res) => {
    console.log('[post - login]: ', req.body);
    return res.send(req.body)
  })

  app.get("/api/auth/current_user", (req, res) => {
    return res.send({ username: "Pablo", password: "1234" });
  });
};
