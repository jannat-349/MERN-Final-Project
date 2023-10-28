const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerUser = async ({username, email, password}) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
};
const getUserByEmailOrUsername = async ({email, username}) =>
  await User.findOne({ $or: [{ email }, { username }] });

const getUserById = async (id) => await User.findById(id);

const updateUser = async (id, body) =>
  await User.findByIdAndUpdate(id, body, {
    new: true,
  });
const deleteUser = async (id) => await User.findByIdAndDelete(id);
module.exports = {
  getUserByEmailOrUsername,
  registerUser,
  getUserById,
  updateUser,
  deleteUser,
};
