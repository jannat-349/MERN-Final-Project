const express = require("express");
const Employee = require("../../models/Employee");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../employee-management/public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/employee/create", upload.single("image"), async (req, res) => {
  try {
    const {
      id,
      firstName,
      lastName,
      age,
      position,
      email,
      phone,
      address,
      joiningDate,
      salary,
      department,
      skills,
      // education,
    } = req.body;
    const image = path.basename(req.file.path);
    // education = JSON.parse(education);
    // console.log(education);
    const employeeObj = new Employee({
      id,
      firstName,
      lastName,
      name: firstName + " " + lastName,
      age,
      position,
      email,
      phone,
      address,
      image,
      department,
      joiningDate,
      salary,
      skills,
      // education,
    });
    console.log(employeeObj);

    await employeeObj
      .save()
      .then((savedEmployee) => {
        res.status(201).json(savedEmployee);
      })
      .catch(() => {
        res.status(400).send("Employee not created. Please try again later.");
      });
  } catch (error) {
    console.error(error);
  }
});

router.get("/employees", async (req, res) => {
  try {
    const employees = (await Employee.find({})).filter(
      (employee) => employee.isDeleted === false
    );
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send(`Something Went wrong`);
  }
});

router.get("/employee/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findOne({ _id: id });
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: `Employee not found` });
    }
  } catch (error) {
    res.status(500).send(`Something Went wrong ${error}`);
  }
});

router.put("/employee/update/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    body.name = body.firstName + " " + body.lastName;
    if (req.file) {
      body.image = path.basename(req.file.path);
    }
    const employee = await Employee.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: `Employee not found` });
    }
  } catch (error) {
    res.status(500).send(`Something Went wrong ${error}`);
  }
});

router.put("/employee/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);
    if (!employee.isDeleted) {
      employee.isDeleted = true;
      await employee.save();
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: `Employee not found` });
    }
  } catch (error) {
    res.status(500).send(`Something Went wrong ${error}`);
  }
});

module.exports = router;
