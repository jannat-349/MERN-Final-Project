import React, { useContext } from "react";
import { useState } from "react";
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
import axios from "axios";
import {
  CREATE_EMPLOYEE_API_URL,
  GET_All_DEPARTMENTS_API_URL,
} from "../../api/api";
import { paperStyle } from "../../common/styles/paperStyle";
import Title from "../extras/Title";
import { fieldStyle } from "../../common/styles/fieldStyle";
import { avatarStyle } from "../../common/styles/avatarStyle";
import { inputStyle } from "../../common/styles/inputStyle";
import { useEffect } from "react";
import { fetchDataFromAPI } from "../../utils/fetchDataFromAPI";

export default function CreateEmployee() {
  const navigate = useNavigate();
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

  const [departmentList, setDepartmentList] = useState([]);
  const fetchData = async () => {
    try {
      const data = await fetchDataFromAPI(GET_All_DEPARTMENTS_API_URL);
      setDepartmentList(data.map((dept) => dept.name));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
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
      formData.append("skills[]", skill);
    });

    try {
      await axios.post(CREATE_EMPLOYEE_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  const addSkill = () => {
    if (skill) {
      const updatedSkills = [...skills, skill];
      setSkills(updatedSkills);
      setSkill("");
    } else {
      alert("Enter a skill to add");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  return (
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
              type="text"
              style={inputStyle}
              onChange={(e) => setId(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>First Name</InputLabel>
            <Input
              style={inputStyle}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Last Name</InputLabel>
            <Input
              style={inputStyle}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Age</InputLabel>
            <Input
              type="Number"
              style={inputStyle}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Position</InputLabel>
            <Input
              style={inputStyle}
              onChange={(e) => setPosition(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Email</InputLabel>
            <Input
              style={inputStyle}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Phone</InputLabel>
            <Input
              style={inputStyle}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Address</InputLabel>
            <Input
              style={inputStyle}
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
              style={inputStyle}
              onChange={(e) => setJoiningDate(new Date(e.target.value))}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            <InputLabel>Salary</InputLabel>
            <Input
              style={inputStyle}
              type="Number"
              onChange={(e) => setSalary(e.target.value)}
            />
          </FormControl>
          <FormControl style={fieldStyle}>
            {departmentList ? (
              <div>
                <Title>Department</Title>
                <Select
                  style={inputStyle}
                  onChange={(e) => setDepartment(e.target.value)}
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
