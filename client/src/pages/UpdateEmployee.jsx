import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  fieldStyle,
  inputStyle,
  avatarStyle,
  paperStyle,
} from "../assets/common/styles/style";
import Title from "../components/Title";
import employeeServices from "../services/employeeServices";
import departmentServices from "../services/departmentServices";
import { getImageUrl } from "../utils/imgUrl";

export default function UpdateEmployee() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [employee, setEmployee] = useState({});
  const [allSkills, setAllSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const [formData, setFormData] = useState({});
  const fetchData = async () => {
    try {
      const foundEmployee = await employeeServices.getAnEmployee(employeeId);
      const data = await departmentServices.getAllDepartments();
      setDepartmentList(data.map((dept) => dept.name));
      setEmployee(foundEmployee);
      const initialFormData = { ...foundEmployee };
      setFormData(initialFormData);
      setAllSkills(foundEmployee.skills);
      setIsLoading(false);
    } catch (err) {
      alert("Failed to load data");
      console.error(err);
    }
  };

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
      const employee = await employeeServices.updateAnEmployee(
        employeeId,
        formData
      );
      console.log(employee);
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
    const updatedSkills = [...allSkills];
    updatedSkills.splice(index, 1);
    setAllSkills(updatedSkills);
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Grid paddingTop={"20px"}>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center" paddingBottom={"40px"}>
          <Avatar style={avatarStyle}>
            <HowToReg />
          </Avatar>
          <Title>Update Employee</Title>
          <Typography variant="caption">
            Please fill this form to update the employee information
          </Typography>
        </Grid>
        <FormGroup>
          <FormControl style={fieldStyle}>
            <InputLabel>Employee Id</InputLabel>
            <Input
              type="text"
              style={inputStyle}
              defaultValue={employee.id}
              name="id"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>First Name</InputLabel>
            <Input
              style={inputStyle}
              defaultValue={employee.firstName}
              name="firstName"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Last Name</InputLabel>
            <Input
              style={inputStyle}
              defaultValue={employee.lastName}
              name="lastName"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Age</InputLabel>
            <Input
              type="Number"
              defaultValue={employee.age}
              name="age"
              style={inputStyle}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Position</InputLabel>
            <Input
              style={inputStyle}
              defaultValue={employee.position}
              name="position"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Email</InputLabel>
            <Input
              style={inputStyle}
              defaultValue={employee.email}
              name="email"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Phone</InputLabel>
            <Input
              style={inputStyle}
              defaultValue={employee.phone}
              name="phone"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Address</InputLabel>
            <Input
              style={inputStyle}
              defaultValue={employee.address}
              name="address"
              onChange={handleChange}
            />
          </FormControl>
          <InputLabel>Change Image</InputLabel>
          <FormControl style={fieldStyle}>
            <img
              src={"/" + getImageUrl(employee.image)}
              alt={employee.name}
              style={{ width: "200px", height: "200px" }}
            />
            <Input type="file" name="image" onChange={handleChange} />
          </FormControl>

          <InputLabel>Joining Date</InputLabel>
          <FormControl style={fieldStyle}>
            <Input
              type="date"
              value={
                employee.joiningDate
                  ? new Date(employee.joiningDate).toISOString().split("T")[0]
                  : ""
              }
              style={inputStyle}
              name="joiningDate"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Salary</InputLabel>
            <Input
              style={inputStyle}
              defaultValue={employee.salary}
              type="Number"
              name="salary"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <Title>Department</Title>
            {departmentList ? (
              <Select
                style={inputStyle}
                name="department"
                onChange={handleChange}
                IconComponent={ArrowDropDown}
                defaultValue={employee.department}
              >
                {departmentList.map((dept) => (
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
            {allSkills ? (
              <ol>
                {allSkills.map((skill, index) => (
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

          {/* <FormControl style={fieldStyle}>
            <Title>Educational Qualifications</Title>
            {educations ? (
              <ol>
                {educations.map((education, index) => (
                  <li key={index}>
                    <ul>
                      <li>{`Degree: ${education.degree}`}</li>
                      <li>{`University: ${education.university}`}</li>
                      <li>{`Graduation Year: ${education.graduationYear}`}</li>
                    </ul>
                    <Button
                      type="button"
                      onClick={() => removeEducation(index)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ol>
            ) : (
              <></>
            )}
            <FormControl>
              <Input
                type="text"
                style={inputStyle}
                onChange={(e) => {
                  setDegree(e.target.value);
                }}
                placeholder="Degree"
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                style={inputStyle}
                onChange={(e) => {
                  setUniversity(e.target.value);
                }}
                placeholder="University"
              />
            </FormControl>
            <FormControl>
              <Input
                type="number"
                style={inputStyle}
                onChange={(e) => {
                  setGraduationYear(e.target.value);
                }}
                placeholder="Graduation Year"
              />
            </FormControl>
            <Button type="button" onClick={addEducation}>
              Add
            </Button>
          </FormControl> */}

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
