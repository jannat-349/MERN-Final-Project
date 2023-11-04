const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRoutes = express.Router();

const { getUserByEmailOrUsername } = require("../services/userServices");

const SECRET_KEY = process.env.JWT_SECRET;
const TOKEN_DURATION = process.env.TOKEN_DURATION;
authRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserByEmailOrUsername({ username });
  if (!user) {
    return res.status(401).json({ message: `User not found` });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: `Wrong password!!!` });
  }
  const token = jwt.sign({ username }, SECRET_KEY, {
    expiresIn: TOKEN_DURATION,
  });
  res.status(200).json({ token });
});

module.exports = authRoutes;
