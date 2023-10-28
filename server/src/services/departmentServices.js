const Department = require("../models/Department");

const getAllDepartments = async () => await Department.find();

module.exports = getAllDepartments;
