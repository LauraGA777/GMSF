import { ProtectedRoute } from "@/features/auth/ProtectedRoute"
import { ServicesPage } from "@/features/services/pages/ServicesPage"

export const servicesRoutes = [
  {
    path: "services",
    element: (
      <ProtectedRoute allowedRoles={["admin", "trainer"]}>
        <ServicesPage />
      </ProtectedRoute>
    ),
  },
]
