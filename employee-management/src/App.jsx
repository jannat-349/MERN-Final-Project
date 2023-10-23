import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./login/components/LoginPage";
import UpdateEmployee from "./dashboard/components/pages/UpdateEmployee";
import CreateEmployee from "./dashboard/components/pages/CreateEmployee";
import Dashboard from "./dashboard/components/Dashboard";

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
      </Routes>
    </Router>
  );
}

export default App;
