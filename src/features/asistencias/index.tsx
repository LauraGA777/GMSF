import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegistroAsistencia } from "@/components/asistencias/registro-asistencia"
import { HistorialAsistencias } from "@/components/asistencias/historial-asistencias"

export default function AsistenciasPage() {
  return (
    <div className="space-y-6">
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
    </div>
  )
}
