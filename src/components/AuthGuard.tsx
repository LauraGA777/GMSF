import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth/AuthProvider";

export function AuthGuard({ children }: { children: React.ReactElement }) {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/", { replace: true });
        }
    }, [user, loading, navigate]);

    if (loading) return <div>Cargando...</div>;

    return user ? children : null;
}