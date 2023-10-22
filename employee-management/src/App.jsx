import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./login/components/LoginPage";
import Dashboard from "./dashboard/components/Dashboard";
import UpdateEmployee from "./dashboard/components/UpdateEmployee";
import CreateEmployee from "./dashboard/components/CreateEmployee";
import ShowEmployee from "./dashboard/components/ShowEmployee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/admin/employee/update/:employeeId"
          element={<UpdateEmployee />}
        />
        <Route path="/admin/employee/create" element={<CreateEmployee />} />
        <Route path="/admin/employee/:employeeId" element={<ShowEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
