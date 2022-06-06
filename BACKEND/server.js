const express = require("express");
const authRouter = require("./routes/auth.router");
const app = express();
const db = require("./models");

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth',authRouter);

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Hi!" });
});


  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });