import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./ListItems";
import Chart from "./Chart";
import { SearchEmployee } from "./SearchEmployee";
import EmployeeTable from "./EmployeeTable";
import { useState } from "react";
import { useEffect } from "react";
import DashboardContext from "../context/DashboardContext";
import { fetchDataFromAPI } from "../utils/fetchDataFromAPI";
import { DELETE_EMPLOYEE_API_URL, GET_All_EMPLOYEES_API_URL } from "../api/api";
import axios from "axios";
import TotalEmployees from "./TotalEmployees";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [ageSum, setAgeSum] = useState(0);
  const [searchList, setSearchList] = useState([]);
  const [positionCounts, setPositionCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const fetchData = async () => {
    try {
      const data = await fetchDataFromAPI(GET_All_EMPLOYEES_API_URL);
      const totalAge = data.reduce((sum, employee) => sum + employee.age, 0);
      const counts = {};
      data.forEach((employee) => {
        const position = employee.position;
        counts[position] = (counts[position] || 0) + 1;
      });
      setPositionCounts(counts);
      setAgeSum(totalAge);
      setEmployees(data);
      setSearchList(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const handleSearch = (option) => {
    const filteredEmployees = searchList.filter((employee) =>
      employee.name.toLowerCase().includes(option.toLowerCase())
    );
    setEmployees(filteredEmployees);
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await axios.put(DELETE_EMPLOYEE_API_URL + employeeId, {
        isDeleted: true,
      });
      const updatedEmployees = employees.filter(
        (employee) => employee._id !== employeeId
      );
      const totalAge = updatedEmployees.reduce(
        (sum, employee) => sum + employee.age,
        0
      );
      setAgeSum(totalAge);
      setEmployees(updatedEmployees);
      setSearchList(updatedEmployees);
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <h1>Loading....</h1>
  ) : (
    <DashboardContext.Provider value={{ employees, setEmployees, ageSum }}>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              {secondaryListItems}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Search Employee */}
                <Grid item xs={12} md={8} lg={9}>
                  <SearchEmployee
                    searchList={searchList}
                    onSearch={handleSearch}
                  />
                </Grid>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Chart />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <TotalEmployees />
                  </Paper>
                </Grid>
                {/* Employee Table*/}
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 500,
                    }}
                  >
                    <EmployeeTable onDelete={handleDeleteEmployee} />
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </DashboardContext.Provider>
  );
}
