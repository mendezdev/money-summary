const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');
const app = express();

require('./models/User');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true
});

app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 1000,
  keys: [keys.cookieSecret]
}))
app.use(passport.initialize())
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get("/", (req, res) => {
  res.send({ message: "THIS IS HOME" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
