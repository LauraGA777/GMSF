import { useAuth } from "@/providers/auth/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Si está cargando, mostramos un indicador o simplemente esperamos
    if (loading) {
        return <div>Cargando...</div>; // Puedes reemplazar esto con un spinner o componente de carga
    }

    // Solo redirigimos si no está autenticado y ya terminó de cargar
    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}