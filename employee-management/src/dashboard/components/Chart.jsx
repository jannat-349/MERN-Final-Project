// import React from "react";
// import { LinearScale, CategoryScale, Chart as ChartJS } from "chart.js"; // Import the necessary modules
// import { Bar } from "react-chartjs-2";

// ChartJS.register(LinearScale);
// ChartJS.register(CategoryScale);
// ChartJS.register(Bar);

// export default function Chart({ data }) {
//   // Extract position names from the data object
//   const positionNames = Object.keys(data);
//   const numOfEmployees = Object.values(data);

//   const chartData = {
//     labels: positionNames,
//     datasets: [
//       {
//         label: "Number of Employees",
//         backgroundColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//         data: numOfEmployees,
//       },
//     ],
//   };

//   return (
//     <div>
//       <div
//         style={{
//           width: "50%",
//           height: "400px",
//           display: "inline-flex",
//           backgroundColor: "antiquewhite",
//         }}
//       >
//         <Bar
//           options={{
//             maintainAspectRatio: false,
//             scales: {
//               yAxes: [
//                 {
//                   ticks: {
//                     beginAtZero: true,
//                     fontSize: 15,
//                     fontColor: "#000",
//                   },
//                 },
//               ],
//               x: [
//                 {
//                   ticks: {
//                     fontSize: 16,
//                     fontColor: "#000",
//                   },
//                 },
//               ],
//             },
//             title: {
//               display: true,
//               text: "Employee Distribution Chart",
//               fontSize: 25,
//             },
//           }}
//           data={chartData}
//         />
//       </div>
//     </div>
//   );
// }
import React from 'react'

export default function Chart() {
  return (
    <div>Chart</div>
  )
}
