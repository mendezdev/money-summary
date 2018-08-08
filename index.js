const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const keys = require('./config/keys');
const app = express();

require('./models/User');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true
});

app.use(bodyParser.json());

require('./routes/authRoutes')(app);

app.get("/", (req, res) => {
  res.send({ message: "THIS IS HOME" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
