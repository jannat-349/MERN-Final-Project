require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Employee Management System!");
});

connectDB();

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", employeeRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
