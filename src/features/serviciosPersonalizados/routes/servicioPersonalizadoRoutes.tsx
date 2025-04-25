import { RouteObject } from "react-router-dom";
import ServicioPersonalizadoPage from "../pages/servicioPersonalizadoPage"

export const servicioPersonalizadoRoutes: RouteObject[] = [
    {
        path: "/servicio-personalizado",
        element: <ServicioPersonalizadoPage/>
    }
];