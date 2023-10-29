import React, { useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

export function Chart({ data, type }) {
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

  const dataset =
    type === "bar"
      ? {
          label: "Number of Employees",
          data: numOfEmployees,
          backgroundColor: ["rgba(75, 192, 192, 1)", "#ecf0f1", "#50AF95"],
          borderColor: "black",
          borderWidth: 2,
        }
      : {
          label: "Number of Employees",
          data: numOfEmployees,
          borderColor: "black",
          borderWidth: 2,
        };

  const [userData, setUserData] = useState({
    labels: positionNames,
    datasets: [dataset],
  });

  return (
    <div style={{ width: 800, height: 250, marginTop: 40 }}>
      {type === "bar" ? (
        <BarChart data={userData} options={chartOptions} />
      ) : (
        <LineChart data={userData} options={chartOptions} />
      )}
    </div>
  );
}
