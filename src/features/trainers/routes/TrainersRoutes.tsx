import { ProtectedRoute } from "@/features/auth/ProtectedRoute"
import { TrainersPage } from "@/features/trainers/pages/TrainersPage"

export const trainersRoutes = [
  {
    path: "trainers",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <TrainersPage />
      </ProtectedRoute>
    ),
  },
]
