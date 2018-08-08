const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

require('./routes/authRoutes').default(app);

app.get("/", (req, res) => {
  res.send({ message: "THIS IS HOME" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
