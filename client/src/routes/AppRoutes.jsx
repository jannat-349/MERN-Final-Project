import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import Dashboard from "../pages/Dashboard";

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
          path: '/dashboard',
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
