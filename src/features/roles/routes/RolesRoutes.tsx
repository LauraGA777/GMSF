import { ProtectedRoute } from "@/features/auth/ProtectedRoute"
import { RolesPage } from "@/features/roles/pages/RolesPage"

export const rolesRoutes = [
  {
    path: "roles",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <RolesPage />
      </ProtectedRoute>
    ),
  },
]
export default rolesRoutes