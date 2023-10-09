require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
// const cors = require("cors");

const app = express();

// app.use(cors());

app.use(bodyParser.json());



app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB();

app.use("/api/admin", require("./routes/api/admin"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});