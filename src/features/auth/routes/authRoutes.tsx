import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ProfileEditorPage from "../pages/EditProfilePage";

export const authRoutes: RouteObject[] = [
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
    },
    {
        path: "/reset-password",
        element: <ResetPasswordPage />,
    },
    {
        path: "/edit-profile",
        element: <ProfileEditorPage />,
    }
];