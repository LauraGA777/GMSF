// src/providers/AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from "react";

// Mock user data for local authentication
const MOCK_USERS = [
    {
        id: "1",
        nombre: "Admin",
        apellido: "Usuario",
        email: "admin@strongfit.com",
        correo: "admin@strongfit.com", // For login matching
        contrasena: "admin123", // Simple password for demo
        rol: "ADMIN",
        estado: true,
        fechaRegistro: new Date().toISOString(),
    },
    {
        id: "2",
        nombre: "Usuario",
        apellido: "Normal",
        email: "usuario@strongfit.com",
        correo: "usuario@strongfit.com", // For login matching
        contrasena: "user123", // Simple password for demo
        rol: "USER",
        estado: true,
        fechaRegistro: new Date().toISOString(),
    }
];

type AuthContextType = {
    user: any;
    loading: boolean;
    isAuthenticated: boolean;
    login: (datos: { correo: string; contrasena: string }) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Determina si el usuario está autenticado basado en la presencia del usuario
    const isAuthenticated = !!user;

    useEffect(() => {
        const checkAuth = async () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    localStorage.removeItem("user");
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (datos: { correo: string; contrasena: string }) => {
        // Find user with matching email and password
        const foundUser = MOCK_USERS.find(
            u => u.correo === datos.correo && u.contrasena === datos.contrasena
        );

        if (!foundUser) {
            throw new Error("Credenciales incorrectas");
        }

        // Create a user object without the password
        const { contrasena, ...userToStore } = foundUser;

        // Store user in localStorage
        localStorage.setItem("user", JSON.stringify(userToStore));
        setUser(userToStore);

        // Navigate to dashboard
        window.location.href = "/dashboard";
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);