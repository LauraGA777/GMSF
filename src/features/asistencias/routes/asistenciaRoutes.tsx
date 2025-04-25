import { RouteObject } from "react-router-dom";
import AsistenciasPage from "../index";

export const asistenciaRoutes: RouteObject[] = [
    {
        path: "/asistencias",
        element: <AsistenciasPage />,
    },
];