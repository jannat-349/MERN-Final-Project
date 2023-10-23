import React from "react";
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
import { CREATE_EMPLOYEE_API_URL } from "../api/api";
import { paperStyle } from "../common/styles/paperStyle";
import Title from "./Title";
import { fieldStyle } from "../common/styles/fieldStyle";
import { avatarStyle } from "../common/styles/avatarStyle";
import { inputStyle } from "../common/styles/inputStyle";

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
  const [department, setDepartment] = useState("Choose a department");
  const [joiningDate, setJoiningDate] = useState(new Date());
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [image, setImage] = useState(null);
//   const [educations, setEducations] = useState([]); // Updated to use educations state
//   const [degree, setDegree] = useState("");
//   const [university, setUniversity] = useState("");
//   const [graduationYear, setGraduationYear] = useState(0);
  const [departments, setDepartments] = useState([
    "Choose a department",
    "Department A",
    "Department B",
    "Analytics",
    "Department C",
  ]);

//   const handleEducationChange = (e) => {
//     const { name, value } = e.target;
//     setEducations({
//       ...educations,
//       [name]: value,
//     });
//   };

  async function submit(e) {
    if (department === "Choose a department") {
      alert("Please select a department!");
    } else {
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

    //   // Add education data to formData
    //   educations.forEach((education, index) => {
    //     formData.append(`educations[${index}][degree]`, education.degree);
    //     formData.append(
    //       `educations[${index}][university]`,
    //       education.university
    //     );
    //     formData.append(
    //       `educations[${index}][graduationYear]`,
    //       education.graduationYear
    //     );
    //   });

      try {
        await axios.post(CREATE_EMPLOYEE_API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
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

//   const addEducation = () => {
//     if (degree && university && graduationYear) {
//       const updatedEducations = [
//         ...educations,
//         { degree, university, graduationYear },
//       ];
//       setEducations(updatedEducations);
//     } else {
//       alert("Fill out all the fields");
//     }
//   };

//   const removeEducation = (index) => {
//     const updatedEducations = [...educations];
//     updatedEducations.splice(index, 1);
//     setEducations(updatedEducations);
//   };

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
              type="Number"
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
            <Title>Department</Title>
            {departments ? (
              <Select
                style={inputStyle}
                onChange={(e) => setDepartment(e.target.value)}
                IconComponent={ArrowDropDown}
                defaultValue={department}
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
                onChange={handleEducationChange}
                placeholder="Degree"
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                style={inputStyle}
                onChange={handleEducationChange}
                placeholder="University"
              />
            </FormControl>
            <FormControl>
              <Input
                type="number"
                style={inputStyle}
                onChange={handleEducationChange}
                placeholder="Graduation Year"
              />
            </FormControl>
            <Button type="button" onClick={addEducation}>
              Add
            </Button>
          </FormControl> */}
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
