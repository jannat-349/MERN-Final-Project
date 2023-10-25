import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  FormControl,
  FormGroup,
  Grid,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import Title from "../../dashboard/components/extras/Title";
import { paperStyle } from "../../dashboard/common/styles/paperStyle";
import { avatarStyle } from "../../dashboard/common/styles/avatarStyle";
import { Login } from "@mui/icons-material";
import { LOGIN_USER_API_URL } from "../api/api";

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function submit(e) {
    e.preventDefault();
    const user = { email, password, type: "admin" };
    try {
      await axios.post(LOGIN_USER_API_URL, user);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Grid paddingTop={"20px"} width={"100vw"}>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center" paddingBottom={"40px"}>
          <Avatar style={avatarStyle}>
            <Login />
          </Avatar>
          <Title>Login User</Title>
          <Typography variant="caption">
            Please fill this form to login
          </Typography>
        </Grid>
        <FormGroup
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
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
            Log in
          </Button>
        </FormGroup>
        <Typography align="center">
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
