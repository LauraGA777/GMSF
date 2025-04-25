import { useParams } from "react-router-dom"
import { MembresiaForm } from "@/components/membresias/membresia-form"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { NavBar } from "@/components/layout/nav-bar"
import { AppSidebar } from "@/components/layout/app-sidebar"

export default function EditarMembresiaPage() {
    const { id } = useParams()
    const isNew = id === "nueva"

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <NavBar />
                <main className="container mx-auto py-6 px-4 md:px-6">
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold">{isNew ? "Nueva Membresía" : "Editar Membresía"}</h1>
                        <MembresiaForm id={isNew ? null : Number.parseInt(id!)} />
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}