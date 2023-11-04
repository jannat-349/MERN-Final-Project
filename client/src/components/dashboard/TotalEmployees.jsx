import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../Title";
import { useContext } from "react";
import { Add } from "@mui/icons-material";
import DashboardContext from "../../contexts/DashboardContext";
import { Grid, Paper } from "@mui/material";
const StatisticsDisplay = ({ ageSum, employeeCount }) => {
  const averageAge =
    employeeCount > 0 ? (ageSum / employeeCount).toFixed(2) : 0.0;

  return (
    <div>
      <Title>Total Employees</Title>
      <Typography component="p" variant="h4">
        {employeeCount}
      </Typography>
      <Title>Average Age</Title>
      <Typography component="p" variant="h4">
        {averageAge}
      </Typography>
    </div>
  );
};

export function TotalEmployees() {
  const { employees, ageSum } = useContext(DashboardContext);
  return (
    <Grid item xs={12} md={4}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 240,
        }}
      >
        <StatisticsDisplay ageSum={ageSum} employeeCount={employees.length} />
        <div>
          <Link
            color="primary"
            href="/create"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Add></Add>
            <p>Add new employee</p>
          </Link>
        </div>
      </Paper>
    </Grid>
  );
}
