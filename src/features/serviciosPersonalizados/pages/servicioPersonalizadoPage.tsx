import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ServiceCalendar from "@/components/serviciosPersonalizados/ServicioCalendario"
import ClientReservationView from "@/components/serviciosPersonalizados/ReservaCliente"
import { NavBar } from "@/components/layout/nav-bar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export default function ServicioPersonalizadoPage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <NavBar />
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold mb-6">Sistema de Gestión de Servicios</h1>
                    <Tabs defaultValue="calendar" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="calendar">Programación de Servicios</TabsTrigger>
                            <TabsTrigger value="client">Reservas para Clientes</TabsTrigger>
                        </TabsList>
                        <TabsContent value="calendar" className="mt-0">
                            <ServiceCalendar />
                        </TabsContent>
                        <TabsContent value="client" className="mt-0">
                            <ClientReservationView />
                        </TabsContent>
                    </Tabs>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}