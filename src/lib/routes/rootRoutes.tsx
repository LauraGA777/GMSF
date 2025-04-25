import { RouteObject } from "react-router-dom";
import { authRoutes } from "@/features/auth/routes/authRoutes";
import { dashboardRoutes } from "@/features/dashboard/routes/dashboardRoutes";
import { usuarioRoutes } from "@/features/usuarios/routes/usuarioRoutes";
import { servicioPersonalizadoRoutes } from "@/features/serviciosPersonalizados/routes/servicioPersonalizadoRoutes";
import { ProtectedRoute } from "@/components/auth/protected-route";

// Rutas públicas (no requieren autenticación)
const publicRoutes = [...authRoutes];

// Rutas protegidas (requieren autenticación)
const protectedRoutesConfig = [
    ...dashboardRoutes,
    ...usuarioRoutes,
    ...servicioPersonalizadoRoutes,
];

// Envolver rutas protegidas con el componente ProtectedRoute
const protectedRoutes = protectedRoutesConfig.map((route) => ({
    ...route,
    element: <ProtectedRoute>{route.element}</ProtectedRoute>,
}));

export const rootRoutes: RouteObject[] = [
    ...publicRoutes,
    ...protectedRoutes,
    {
        path: "*",
        element: <div>Página no encontrada 404</div>,
    },
];