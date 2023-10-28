import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UpdateEmployee from "./dashboard/components/pages/UpdateEmployee";
import CreateEmployee from "./dashboard/components/pages/CreateEmployee";
import Dashboard from "./dashboard/components/Dashboard";
import LoginPage from "./login/components/LoginPage";
import RegisterPage from "./login/components/RegisterPage";
import HomePage from "./homepage/Homepage";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/employee/create" element={<CreateEmployee />} />
          <Route
            path="/admin/employee/update/:employeeId"
            element={<UpdateEmployee />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
