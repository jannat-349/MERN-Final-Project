import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowDropDown, HowToReg } from "@mui/icons-material";
import axios from "axios";
import { fetchDataFromAPI } from "../utils/fetchDataFromAPI";
import { GET_AN_EMPLOYEE_API_URL, UPDATE_EMPLOYEE_API_URL } from "../api/api";
import { paperStyle } from "../common/styles/paperStyle";
import Title from "./Title";
import { fieldStyle } from "../common/styles/fieldStyle";
import { avatarStyle } from "../common/styles/avatarStyle";
import { inputStyle } from "../common/styles/inputStyle";

export default function UpdateEmployee() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [employee, setEmployee] = useState({});
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [salary, setSalary] = useState(0);
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [joiningDate, setJoiningDate] = useState(new Date());
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [image, setImage] = useState(null);
  //   const [education, setEducation] = useState([]);
  //   const [degree, setDegree] = useState("");
  //   const [university, setUniversity] = useState("");
  //   const [graduationYear, setGraduationYear] = useState(0);
  const [departments, setDepartments] = useState([
    "Select a department",
    "Department A",
    "Department B",
    "Analytics",
    "Department C",
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const foundEmployee = await fetchDataFromAPI(
          GET_AN_EMPLOYEE_API_URL + employeeId
        );
        setEmployee(foundEmployee);
        console.log(foundEmployee.skills);
        setId(foundEmployee.id);
        setFirstName(foundEmployee.firstName);
        setLastName(foundEmployee.lastName);
        setAge(foundEmployee.age);
        setPosition(foundEmployee.position);
        setEmail(foundEmployee.email);
        setPhone(foundEmployee.phone);
        setAddress(foundEmployee.address);
        setDepartment(foundEmployee.department);
        setSkills(foundEmployee.skills);
        setSalary(foundEmployee.salary);
        setImage(foundEmployee.image);
        setIsLoading(false);
      } catch (err) {
        alert("Failed to load data");
        console.error(err);
      }
    };
    fetchData();
  }, []);

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("age", age);
    formData.append("position", position);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("image", image);
    formData.append("joiningDate", joiningDate);
    formData.append("salary", salary);
    formData.append("department", department);
    skills.forEach((skill) => {
      formData.append("skills[]", skill); // Use 'skills[]' to send an array
    });
    try {
      await axios.put(UPDATE_EMPLOYEE_API_URL + employeeId, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  const addSkill = () => {
    if (skill) {
      const updatedSkills = [...skills, skill];
      setSkills(updatedSkills);
    } else {
      alert("Enter a skill to add");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Grid paddingTop={"20px"} width={"100vw"}>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center" paddingBottom={"40px"}>
          <Avatar style={avatarStyle}>
            <HowToReg />
          </Avatar>
          <Title>Create Employee</Title>
          <Typography variant="caption">
            Please fill this form to create the employee information
          </Typography>
        </Grid>
        <FormGroup>
          <FormControl style={fieldStyle}>
            <InputLabel>Employee Id</InputLabel>
            <Input
              type="Number"
              style={inputStyle}
              defaultValue={employee.id}
              onChange={(e) => setId(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>First Name</InputLabel>
            <Input
              style={inputStyle}
              defaultValue={employee.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Last Name</InputLabel>
            <Input
              style={inputStyle}
              defaultValue={employee.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Age</InputLabel>
            <Input
              type="Number"
              defaultValue={employee.age}
              style={inputStyle}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Position</InputLabel>
            <Input
              style={inputStyle}
              defaultValue={employee.position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Email</InputLabel>
            <Input
              style={inputStyle}
              defaultValue={employee.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Phone</InputLabel>
            <Input
              style={inputStyle}
              defaultValue={employee.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Address</InputLabel>
            <Input
              style={inputStyle}
              defaultValue={employee.address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
          <InputLabel>Image</InputLabel>
          <FormControl style={fieldStyle}>
            <Input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </FormControl>
          <InputLabel>Joining Date</InputLabel>
          <FormControl style={fieldStyle}>
            <Input
              type="Date"
              defaultValue={joiningDate.toISOString().split("T")[0]}
              style={inputStyle}
              onChange={(e) => setJoiningDate(new Date(e.target.value))}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Salary</InputLabel>
            <Input
              style={inputStyle}
              defaultValue={employee.salary}
              type="Number"
              onChange={(e) => setSalary(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <Title>Department</Title>
            {departments ? (
              <Select
                style={inputStyle}
                onChange={(e) => setDepartment(e.target.value)}
                IconComponent={ArrowDropDown}
                defaultValue={employee.department}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <></>
            )}
          </FormControl>
          <FormControl style={fieldStyle}>
            <Title>Skills</Title>
            {skills ? (
              <ol>
                {skills.map((skill, index) => (
                  <li key={index}>
                    {skill}
                    <Button type="button" onClick={() => removeSkill(index)}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ol>
            ) : (
              <></>
            )}
            <Input
              type="text"
              style={inputStyle}
              onChange={(e) => {
                setSkill(e.target.value);
              }}
              placeholder="Add new skill"
            />
            <Button type="button" onClick={addSkill}>
              Add
            </Button>
          </FormControl>
          <Button type="submit" onClick={submit}>
            Update
          </Button>
        </FormGroup>
        <p align="center">
          <Link to="/dashboard">Cancel</Link>
        </p>
      </Paper>
    </Grid>
  );
}
