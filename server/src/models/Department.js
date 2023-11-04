const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Department = mongoose.model("Department", departmentSchema);
