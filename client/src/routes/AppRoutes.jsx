import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import Dashboard from "../pages/Dashboard";

import { SecureRoute } from "./SecureRoute";
import CreateEmployee from "../pages/CreateEmployee";
import UpdateEmployee from "../pages/UpdateEmployee";

const secureRouteWrapper = (element) => <SecureRoute>{element}</SecureRoute>;

export function AppRoutes() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [
        {
          index: true,
          element: <AboutPage />,
        },
        {
          path: "/dashboard",
          element: secureRouteWrapper(<Dashboard />),
        },
        {
          path: "/create",
          element: secureRouteWrapper(<CreateEmployee />),
        },
        {
          path: "/update/:employeeId",
          element: secureRouteWrapper(<UpdateEmployee />),
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
