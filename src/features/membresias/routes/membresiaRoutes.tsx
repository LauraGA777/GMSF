import { RouteObject } from "react-router-dom";
import MembresiaPage from "../pages/index";
import EditarMembresiaPage from "../pages/editar";


export const membresiaRoutes: RouteObject[] = [
    {
        path: "/membresia",
        element: <MembresiaPage/>
    },
    {
        path: "membresias/nueva",
        element: <EditarMembresiaPage />
    },
    {
        path: "membresias/:id",
        element: <EditarMembresiaPage />
    }
];