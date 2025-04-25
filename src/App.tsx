import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Route, Routes, useRoutes } from "react-router-dom";
import { AuthProvider } from "./providers/auth/AuthProvider";
import { rootRoutes } from "./lib/routes/rootRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main className="flex min-h-screen items-center justify-center bg-gray-50">
          <Routes>
            {rootRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
          <Toaster />
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;