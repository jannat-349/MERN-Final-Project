const express = require("express");
const Employee = require("../../models/Employee");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "This is the admin page" });
  } catch (error) {
    res.status(500).send(`something went wrong ${error}`);
  }
});

router.post("/employee/create", upload.single("image"), async (req, res) => {
  try {
    const body = req.body;
    if (!req.file) {
      return res.status(400).send("Image is required.");
    }
    const education = JSON.parse(req.body.education);
    const filename = path.basename(req.file.path);
    const employeeObj = new Employee({
      id: body.id,
      firstName: body.firstName,
      lastName: body.lastName,
      age: body.age,
      position: body.position,
      email: body.email,
      phone: body.phone,
      address: body.address,
      image: filename,
      department: body.department,
      joiningDate: body.joiningDate,
      salary: body.salary,
      skills: body.skills,
      education: education,
    });

    await employeeObj
      .save()
      .then((savedEmployee) => {
        res.status(201).json(savedEmployee);
      })
      .catch((error) => {
        res.status(404).send(`Employee not created... ${error}`);
      });
  } catch (error) {
    res.status(500).send(`Something Went wrong ${error}`);
  }
});

router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send(`Something Went wrong`);
  }
});

router.get("/employee/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findOne({_id: id});
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: `Employee not found` });
    }
  } catch (error) {
    res.status(500).send(`Something Went wrong ${error}`);
  }
});

router.put("/employee/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    if (req.file) {
      body.image = path.basename(req.file.path);
    }
    if (body.education) {
      body.education = JSON.parse(body.education);
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

router.delete("/employee/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      // employee.isDeleted = true;
      // await employee.save();
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: `employee not found` });
    }
  } catch (error) {
    res.status(500).send(`Something Went wrong ${error}`);
  }
});

module.exports = router;
