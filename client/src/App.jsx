import React from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/register" element={<RegisterPage />} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //     <Route path="/admin/employee/create" element={<CreateEmployee />} />
    //     <Route
    //       path="/admin/employee/update/:employeeId"
    //       element={<UpdateEmployee />}
    //     />
    //   </Routes>
    // </Router>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
