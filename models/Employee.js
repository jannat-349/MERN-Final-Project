const mongoose = require("mongoose");

// const educationSchema = new mongoose.Schema({
//   degree: String,
//   university: String,
//   graduationYear: Number,
// });

const employeeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    skills: [
      {
        type: String,
      },
    ],

    // educations: [educationSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = Employee = mongoose.model("Employee", employeeSchema);
