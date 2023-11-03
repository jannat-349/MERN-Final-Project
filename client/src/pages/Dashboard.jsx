import React from "react";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Container, Grid, Paper } from "@mui/material";
import { Chart } from "../components/dashboard/charts/Chart";
import { TotalEmployees } from "../components/dashboard/TotalEmployees";
import { EmployeeTable } from "../components/dashboard/EmployeeTable";
import { SearchEmployee } from "../components/dashboard/SearchEmployee";
import DashboardContext from "../contexts/DashboardContext";
import Title from "../components/Title";
import employeeServices from "../services/employeeServices";
import departmentServices from "../services/departmentServices";
import { RestartAlt } from "@mui/icons-material";

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
      const data = await employeeServices.getAllEmployees();
      const totalAge = data.reduce((sum, employee) => sum + employee.age, 0);
      const counts = {};
      data.forEach((employee) => {
        const position = employee.position;
        counts[position] = (counts[position] || 0) + 1;
      });
      setPositionCounts(counts);
      setAgeSum(totalAge);
      setEmployees(data);
      const data2 = await departmentServices.getAllDepartments();
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
      const employee = await employeeServices.deleteAnEmployee(employeeId);
      const updatedEmployees = employees.filter((e) => e._id !== employee._id);
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
  const handleReset = async () => {
    setSelectedDepartment("All");
    setSelectedPosition("All");
    await fetchData();
  };

  return isLoading ? (
    <h1>Loading....</h1>
  ) : (
    <DashboardContext.Provider value={{ employees, setEmployees, ageSum }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {employees.length > 0 ? <Chart data={positionCounts} /> : <></>}
        <Grid
          item
          xs={12}
          md={12}
          style={{ display: "flex", justifyContent: "space-between" }}
          container
          spacing={3}
          marginBottom={3}
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
            spacing={3}
          >
            {/* Filtering */}
            <Grid
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
                <RestartAlt />
              </Button>
            </Grid>
            {/* Searching */}

            <SearchEmployee searchList={searchList} onSearch={handleSearch} />
          </Grid>

          <TotalEmployees />
        </Grid>

        <EmployeeTable onDelete={handleDeleteEmployee} />
      </Container>
    </DashboardContext.Provider>
  );
}
