import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreVertical, Power, Trash } from "lucide-react"
import { showDeleteConfirmation, showSuccess } from "@/lib/sweet-alert"
import { formatCOP } from "@/lib/utils"
import { Link } from "react-router-dom"


interface Membresia {
    id: number
    nombre: string
    precio: number
    estado: "activo" | "inactivo"
    dias_acceso: number
    vigencia_dias: number
    servicios: string[]
}

const membresias: Membresia[] = [
    {
        id: 1,
        nombre: "Mensual Premium",
        precio: 120000,
        estado: "activo",
        dias_acceso: 30,
        vigencia_dias: 35,
        servicios: ["Gimnasio", "Piscina", "Sauna"],
    },
    {
        id: 2,
        nombre: "Trimestral",
        precio: 300000,
        estado: "activo",
        dias_acceso: 90,
        vigencia_dias: 100,
        servicios: ["Gimnasio", "Piscina", "Sauna", "Clases grupales"],
    },
    {
        id: 3,
        nombre: "Anual",
        precio: 950000,
        estado: "activo",
        dias_acceso: 365,
        vigencia_dias: 380,
        servicios: ["Gimnasio", "Piscina", "Sauna", "Clases grupales", "Entrenador personal"],
    },
    {
        id: 4,
        nombre: "Diario",
        precio: 15000,
        estado: "activo",
        dias_acceso: 1,
        vigencia_dias: 1,
        servicios: ["Gimnasio"],
    },
    {
        id: 5,
        nombre: "Fin de semana",
        precio: 25000,
        estado: "inactivo",
        dias_acceso: 2,
        vigencia_dias: 2,
        servicios: ["Gimnasio", "Piscina"],
    },
]

export function MembresiasList() {
    const [data, setData] = useState<Membresia[]>(membresias)

    const handleDelete = async (id: number) => {
        const membresia = data.find((item) => item.id === id)
        if (!membresia) return

        // Mostrar confirmación con SweetAlert2
        const confirmed = await showDeleteConfirmation(
            "¿Desactivar membresía?",
            `Se desactivará ${membresia.servicios.length} servicios asociados a la membresía "${membresia.nombre}".`,
            membresia.servicios,
        )

        if (confirmed) {
            // Eliminar la membresía
            const newData = data.filter((item) => item.id !== id)
            setData(newData)

            // Mostrar notificación de éxito
            showSuccess("Membresía eliminada", "La membresía ha sido eliminada correctamente")
        }
    }

    return (
        <div className="mt-5 rounded-md border">
            <div className="relative overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Vigencia</TableHead>
                            <TableHead>Servicios</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((membresia) => (
                            <TableRow key={membresia.id}>
                                <TableCell className="font-semibold">{membresia.nombre}</TableCell>
                                <TableCell>{formatCOP(membresia.precio)}</TableCell>
                                <TableCell>
                                    <span
                                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent inline-flex items-center ${membresia.estado ? " text-green-800" : " text-red-800"}`}
                                    >
                                        {membresia.estado ? "Activo" : "Inactivo"}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {membresia.dias_acceso}/{membresia.vigencia_dias} días
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {membresia.servicios.slice(0, 2).map((servicio, index) => (
                                            <Badge key={index} variant="secondary" className="mr-1">
                                                {servicio}
                                            </Badge>
                                        ))}
                                        {membresia.servicios.length > 2 && (
                                            <Badge variant="secondary">+{membresia.servicios.length - 2}</Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link to={`/membresias/${membresia.id}`}>
                                            <Button variant="ghost" size="icon" title="Editar">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(membresia.id)}
                                            title={membresia.estado ? "Desactivar" : "Activar"}
                                        >
                                            <Power className={`h-4 w-4 ${membresia.estado ? "text-red-500" : "text-green-500"}`} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}