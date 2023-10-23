import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../extras/Title";
import DashboardContext from "../../context/DashboardContext";
import { useContext } from "react";
import { Add } from "@mui/icons-material";
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

export default function TotalEmployees() {
  const { employees, ageSum } = useContext(DashboardContext);
  return (
    <React.Fragment>
      <StatisticsDisplay ageSum={ageSum} employeeCount={employees.length} />
      <div>
        <Link
          color="primary"
          href="/admin/employee/create"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Add></Add>
          <p>Add new employee</p>
        </Link>
      </div>
    </React.Fragment>
  );
}
