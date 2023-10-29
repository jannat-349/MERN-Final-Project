import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Container, Grid, Paper } from "@mui/material";
import { Chart } from "../components/dashboard/charts/Chart";
import { TotalEmployees } from "../components/dashboard/TotalEmployees";
import { EmployeeTable } from "../components/dashboard/EmployeeTable";
import { SearchEmployee } from "../components/dashboard/SearchEmployee";
import { fetchDataFromAPI } from "../utils/fetchDataFromAPI";
import {
  DELETE_EMPLOYEE_API_URL,
  GET_All_DEPARTMENTS_API_URL,
  GET_All_EMPLOYEES_API_URL,
} from "../assets/api/api";
import DashboardContext from "../contexts/DashboardContext";
import Title from "../components/Title";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [ageSum, setAgeSum] = useState(0);
  const [searchList, setSearchList] = useState([]);
  const [positionCounts, setPositionCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);

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
      const data2 = await fetchDataFromAPI(GET_All_DEPARTMENTS_API_URL);
      setDepartments(["All", ...data2.map((dept) => dept.name)]);

      const uniquePositions = [
        ...new Set(data.map((employee) => employee.position)),
      ];
      setPositions(["All", ...uniquePositions]);
      setSearchList(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
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

  const filterEmployees = () => {
    let filteredEmployees = searchList;

    if (selectedDepartment !== "All") {
      filteredEmployees = filteredEmployees.filter(
        (employee) => employee.department === selectedDepartment
      );
    }

    if (selectedPosition !== "All") {
      filteredEmployees = filteredEmployees.filter(
        (employee) => employee.position === selectedPosition
      );
    }
    setEmployees(filteredEmployees);
    const totalAge = filteredEmployees.reduce(
      (sum, employee) => sum + employee.age,
      0
    );
    setAgeSum(totalAge);
  };
  useEffect(() => {
    filterEmployees();
  }, [selectedDepartment, selectedPosition]);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    filterEmployees();
  };

  const handlePositionChange = (event) => {
    setSelectedPosition(event.target.value);
    filterEmployees();
  };
  const handleReset = () => {
    setSelectedDepartment("All");
    setSelectedPosition("All");
    fetchData();
  };

  return isLoading ? (
    <h1>Loading....</h1>
  ) : (
    <DashboardContext.Provider value={{ employees, setEmployees, ageSum }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {employees.length > 0 ? (
          <Grid
            item
            xs={12}
            md={12}
            style={{ display: "flex", justifyContent: "space-between" }}
            container
            spacing={3}
            marginBottom={3}
          >
            <Grid item xs={12} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 340,
                }}
              >
                <Chart data={positionCounts} type={"bar"} />
              </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 340,
                }}
              >
                <Chart data={positionCounts} type={"line"} />
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "space-between" }}
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              lg={8}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                  }}
                >
                  <Title>Filter By Department</Title>
                  <Select
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    sx={{ width: "375px", marginRight: 2 }}
                  >
                    {departments.map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
                </Paper>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                  }}
                >
                  <Title>Filter By Position</Title>
                  <Select
                    value={selectedPosition}
                    onChange={handlePositionChange}
                    sx={{ width: 200 }}
                  >
                    {positions.map((position) => (
                      <MenuItem key={position} value={position}>
                        {position}
                      </MenuItem>
                    ))}
                  </Select>
                </Paper>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleReset}
                  sx={{ height: 40 }}
                >
                  Reset
                </Button>
              </div>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "auto",
                }}
              >
                <SearchEmployee
                  searchList={searchList}
                  onSearch={handleSearch}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
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
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 490,
              }}
            >
              <EmployeeTable onDelete={handleDeleteEmployee} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardContext.Provider>
  );
}
