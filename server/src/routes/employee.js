const express = require("express");
const path = require("path");
const upload = require("../middleware/upload");
const employeeRoutes = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../services/employeeServices");
const getAllDepartments = require("../services/departmentServices");

// employeeRoutes.use(authenticateToken);

employeeRoutes.post(
  "/employee/create",
  upload.single("image"),
  async (req, res) => {
    try {
      const body = req.body;
      body.image = path.basename(req.file.path);
      body.name = body.firstName + " " + body.lastName;
      const employee = await createEmployee(body);
      res.status(201).json(employee);
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  }
);

employeeRoutes.get("/employees", async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send(`Something Went wrong ${error}`);
  }
});
employeeRoutes.get("/departments", async (req, res) => {
  try {
    const departments = await getAllDepartments();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).send(`Something Went wrong`);
  }
});

employeeRoutes.get("/employee/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await getEmployeeById(id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: `Employee not found` });
    }
  } catch (error) {
    res.status(500).send(`Something Went wrong ${error}`);
  }
});

employeeRoutes.put(
  "/employee/update/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      body.name = body.firstName + " " + body.lastName;
      if (req.file) {
        body.image = path.basename(req.file.path);
      }
      const employee = await updateEmployee(id, body);
      if (employee) {
        res.status(200).json(employee);
      } else {
        res.status(404).json({ message: `Employee not found` });
      }
    } catch (error) {
      res.status(500).send(`Something Went wrong ${error}`);
    }
  }
);

employeeRoutes.put("/employee/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const employee = await deleteEmployee(id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: `Employee not found` });
    }
  } catch (error) {
    res.status(500).send(`Something Went wrong ${error}`);
  }
});

employeeRoutes.get("/departments", async (req, res) => {
  try {
    const departments = await getAllDepartments();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).send(`Something Went wrong`);
  }
});

module.exports = employeeRoutes;
