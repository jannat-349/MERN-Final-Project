import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { CREATE_USER_API_URL } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import Title from "../../dashboard/components/extras/Title";
import { paperStyle } from "../../dashboard/common/styles/paperStyle";
import { avatarStyle } from "../../dashboard/common/styles/avatarStyle";
import { HowToReg } from "@mui/icons-material";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function submit(e) {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    try {
      await axios.post(CREATE_USER_API_URL, user);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Grid paddingTop={"20px"} width={"100vw"}>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center" paddingBottom={"40px"}>
          <Avatar style={avatarStyle}>
            <HowToReg />
          </Avatar>
          <Title>Register User</Title>
          <Typography variant="caption">
            Please fill this form to create the user information
          </Typography>
        </Grid>
        <FormGroup
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <FormControl>
            <InputLabel>Name</InputLabel>
            <Input
              type="text"
              placeholder="your name"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input
              type="email"
              placeholder="johndoe@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Password</InputLabel>
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            onClick={submit}
            variant="contained"
            style={{ width: "100px", margin: "auto" }}
          >
            Create
          </Button>
        </FormGroup>
        <Typography align="center" marginTop={"30px"}>
          Already have an account? <Link to="/login">Log in</Link>
        </Typography>
        <Typography align="center" marginTop={"10px"}>
          Go back to homepage? <Link to={"/"}>Click Here</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
