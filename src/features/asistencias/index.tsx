import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegistroAsistencia } from "@/components/asistencias/registro-asistencia"
import { HistorialAsistencias } from "@/components/asistencias/historial-asistencias"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { NavBar } from "@/components/layout/nav-bar"

export default function AsistenciasPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavBar />
        <main className="container mx-auto py-6 px-4 md:px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Asistencias</h1>
          </div>
          <Tabs defaultValue="registro" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="registro">Registro</TabsTrigger>
              <TabsTrigger value="historial">Historial</TabsTrigger>
            </TabsList>
            <TabsContent value="registro">
              <RegistroAsistencia />
            </TabsContent>
            <TabsContent value="historial">
              <HistorialAsistencias />
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
