const Employee = require("../models/Employee");

const createEmployee = async (employeeData) => {
  const employee = new Employee(employeeData);
  await employee.save();
  return employee;
};

const getAllEmployees = async () => await Employee.find({ isDeleted: false });

const getEmployeeById = async (employeeId) =>
  await Employee.findById(employeeId);

const updateEmployee = async (employeeId, updateData) => {
  const employee = await Employee.findByIdAndUpdate(employeeId, updateData, {
    new: true,
  });
  return employee;
};

const deleteEmployee = async (employeeId) => {
  const employee = await Employee.findById(employeeId);
  if (!employee.isDeleted) {
    employee.isDeleted = true;
    await employee.save();
  }
  console.log(employee);
  return employee;
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
