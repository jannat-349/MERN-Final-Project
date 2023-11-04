import React, { useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { Grid, Paper } from "@mui/material";

export function Chart({ data }) {
  ChartJS.register(...registerables);

  const chartOptions = {
    scales: {
      x: {
        type: "category",
        beginAtZero: true,
        position: "bottom",
        title: {
          display: true,
          text: "Position",
        },
      },
      y: {
        beginAtZero: true,
        position: "left",
        title: {
          display: true,
          text: "Number of Employees",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const positionNames = Object.keys(data);
  const numOfEmployees = Object.values(data);

  const dataset = {
    label: "Number of Employees",
    data: numOfEmployees,
    backgroundColor: ["rgba(75, 192, 192, 1)", "#ecf0f1", "#50AF95"],
    borderColor: "black",
    borderWidth: 2,
  };

  const [userData, setUserData] = useState({
    labels: positionNames,
    datasets: [dataset],
  });

  return (
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
            <BarChart data={userData} options={chartOptions} />
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
            <LineChart data={userData} options={chartOptions} />
          </Paper>
        </Grid>
      </Grid>
  );
}
