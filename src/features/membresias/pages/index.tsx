import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { MembresiasList } from "@/components/membresias/membresias-list"
import { MembresiaFilters } from "@/components/membresias/membresia-filters"
import { Plus } from "lucide-react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { NavBar } from "@/components/layout/nav-bar"


export default function MembresiaPage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <NavBar />
                <main className="container mx-auto py-6 px-4 md:px-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-3xl font-bold">Membresías</h1>
                        <Link to="/membresias/nueva">
                            <Button className="bg-black hover:bg-gray-800">
                                <Plus className="mr-2 h-4 w-4" />
                                Nueva Membresía
                            </Button>
                        </Link>
                    </div>
                    <MembresiaFilters />
                    <MembresiasList />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}