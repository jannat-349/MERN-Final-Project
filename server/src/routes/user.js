const express = require("express");
const {
  registerUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../services/userServices");

const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: `Please provide all the information` });
  }
  try {
    await registerUser({ username, email, password });
    res.status(201).json({ message: `User registered successfully` });
  } catch (error) {
    res.status(500).send(`Something Went wrong: ${error}`);
  }
});

// userRoutes.get("/profile/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const user = getUserById(id);
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: `User not found` });
//     }
//   } catch (error) {
//     res.status(500).send(`Something Went wrong`);
//   }
// });

// userRoutes.put("/profile", async (req, res) => {
//   try {
//     const id = req.user.id;
//     const body = req.body;
//     const user = updateUser(id, body);
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: `User not found` });
//     }
//   } catch (error) {
//     res.status(500).send(`Something Went wrong`);
//   }
// });

// userRoutes.delete("/profile", async (req, res) => {
//   try {
//     const id = req.user.id;
//     const user = deleteUser(id);
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: `User not found` });
//     }
//   } catch (error) {
//     res.status(500).send(`Something Went wrong`);
//   }
// });

module.exports = userRoutes;
