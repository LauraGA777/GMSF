import { UserManagement } from "@/components/usuarios/user-management"
import { NavBar } from "@/components/layout/nav-bar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export default function UsuarioPage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <NavBar />
                <main className="container mx-auto py-6 px-4 md:px-6">
                    <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>
                    <UserManagement/>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}