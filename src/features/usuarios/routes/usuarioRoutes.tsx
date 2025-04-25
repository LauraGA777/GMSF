import { RouteObject } from "react-router-dom";
import UsuarioPage from "../pages/UsuarioPage";

export const usuarioRoutes: RouteObject[] = [
    {
        path: "/usuario",
        element: <UsuarioPage />,
    },
];