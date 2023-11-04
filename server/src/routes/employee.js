const express = require("express");
const employeeRoutes = express.Router();

const path = require("path");

const upload = require("../middleware/upload");
const AuthenticateToken = require("../middleware/authenticateToken");
const employeeServices = require("../services/employeeServices");
const departmentServices = require("../services/departmentServices");

employeeRoutes.use(AuthenticateToken);

employeeRoutes.post(
  "/employee/create",
  upload.single("image"),
  async (req, res) => {
    const body = req.body;
    if (!req.file) {
      res.status(400).json({ message: `Image is required` });
    }
    if (req.file) {
      body.image = path.basename(req.file.path);
    }
    body.name = body.firstName + " " + body.lastName;
    try {
      await employeeServices.createEmployee(body);
      res.status(201).json({ message: `User registered successfully` });
    } catch (error) {
      res.status(500).send(`Something Went wrong: ${error}`);
    }
  }
);

employeeRoutes.get("/employees", async (req, res) => {
  try {
    const employees = await employeeServices.getAllEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).send(`Something Went wrong ${error}`);
  }
});

employeeRoutes.get("/employee/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await employeeServices.getEmployeeById(id);
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
    const id = req.params.id;
    const body = req.body;
    body.name = body.firstName + " " + body.lastName;
    if (req.file) {
      body.image = path.basename(req.file.path);
    }
    try {
      const employee = await employeeServices.updateEmployee(id, body);
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

    const employee = await employeeServices.deleteEmployee(id);
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
    const departments = await departmentServices.getAllDepartments();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).send(`Something Went wrong ${error}`);
  }
});

module.exports = employeeRoutes;
