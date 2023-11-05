import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  FormControl,
  FormGroup,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { ArrowDropDown, HowToReg } from "@mui/icons-material";

import {
  paperStyle,
  inputStyle,
  fieldStyle,
  avatarStyle,
} from "../assets/common/styles/style";
import Title from "../components/Title";
import employeeServices from "../services/employeeServices";
import departmentServices from "../services/departmentServices";

export default function CreateEmployee() {
  const navigate = useNavigate();
  const [allSkills, setAllSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentList, setDepartmentList] = useState([]);

  const fetchData = async () => {
    try {
      const data = await departmentServices.getAllDepartments();
      console.log(data);
      setDepartmentList(data.map((dept) => dept.name));
    } catch (error) {
      console.error(error);
    }
  };

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else if (name === "joiningDate") {
      setFormData({
        ...formData,
        [name]: new Date(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  async function submit(e) {
    e.preventDefault();
    try {
      await employeeServices.createEmployee(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addSkill = () => {
    if (skill) {
      const updatedSkills = [...allSkills, skill];
      setAllSkills(updatedSkills);
      setFormData({
        ...formData,
        skills: updatedSkills,
      });
      setSkill("");
    } else {
      alert("Enter a skill to add");
    }
  };

  const removeSkill = (index) => {
    console.log(index);
    const updatedSkills = [...allSkills];
    updatedSkills.splice(index, 1);
    setAllSkills(updatedSkills);
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  return (
    <Grid paddingTop={"20px"}>
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
              name="id"
              type="text"
              style={inputStyle}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>First Name</InputLabel>
            <Input
              name="firstName"
              style={inputStyle}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Last Name</InputLabel>
            <Input name="lastName" style={inputStyle} onChange={handleChange} />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Age</InputLabel>
            <Input name="age" style={inputStyle} onChange={handleChange} />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Position</InputLabel>
            <Input name="position" style={inputStyle} onChange={handleChange} />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Email</InputLabel>
            <Input name="email" style={inputStyle} onChange={handleChange} />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Phone</InputLabel>
            <Input name="phone" style={inputStyle} onChange={handleChange} />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Address</InputLabel>
            <Input name="address" style={inputStyle} onChange={handleChange} />
          </FormControl>

          <InputLabel>Image</InputLabel>
          <FormControl style={fieldStyle}>
            <Input type="file" name="image" onChange={handleChange} />
          </FormControl>
          <InputLabel>Joining Date</InputLabel>
          <FormControl style={fieldStyle}>
            <Input
              type="Date"
              style={inputStyle}
              name="joiningDate"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Salary</InputLabel>
            <Input style={inputStyle} name="salary" onChange={handleChange} />
          </FormControl>
          <FormControl style={fieldStyle}>
            {departmentList ? (
              <div>
                <Title>Department</Title>
                <Select
                  style={inputStyle}
                  name="department"
                  onChange={handleChange}
                  IconComponent={ArrowDropDown}
                  defaultValue={department}
                >
                  {departmentList.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            ) : (
              <></>
            )}
          </FormControl>

          <FormControl style={fieldStyle}>
            <Title>Skills</Title>
            {allSkills ? (
              <ol>
                {allSkills.map((skill, index) => (
                  <li key={index}>
                    {skill}
                    <Button
                      type="button"
                      onClick={(index) => removeSkill(index)}
                    >
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
              value={skill}
              placeholder="Add new skill"
            />
            <Button type="button" onClick={addSkill}>
              Add
            </Button>
          </FormControl>
          <Button type="submit" onClick={submit}>
            Create
          </Button>
        </FormGroup>
        <Typography align="center">
          <Link to="/dashboard">Cancel</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
