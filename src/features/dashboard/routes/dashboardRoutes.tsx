import { RouteObject } from "react-router-dom";
import Dashboard from "../pages/DashboardPage";

export const dashboardRoutes: RouteObject[] = [
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
];