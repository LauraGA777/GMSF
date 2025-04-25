import { User, Clock, Calendar, Users, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

const clients = [
    {
        id: 1,
        name: "Juan Gómez",
        email: "juan@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 2,
        name: "María López",
        email: "maria@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 3,
        name: "Pedro Sánchez",
        email: "pedro@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 4,
        name: "Lucía Martínez",
        email: "lucia@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 5,
        name: "Roberto Fernández",
        email: "roberto@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 6,
        name: "Carmen Rodríguez",
        email: "carmen@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
    },
]

const statusColors: Record<string, string> = {
    Disponible: "bg-green-100 text-green-800",
    Completo: "bg-red-100 text-red-800",
    Cancelado: "bg-gray-100 text-gray-800",
}

interface ServiceDetailProps {
    session: any
    onEdit: () => void
    onClose: () => void
}

export default function ServiceDetail({ session, onEdit, onClose }: ServiceDetailProps) {
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
    const [selectedClient, setSelectedClient] = useState<any>(null)

    if (!session) return null

    const enrolledClients = clients.slice(0, session.currentCapacity)

    const handleCancelReservation = (client: any) => {
        setSelectedClient(client)
        setIsCancelDialogOpen(true)
    }

    const confirmCancelReservation = () => {
        console.log("Cancelando reserva para:", selectedClient)
        setIsCancelDialogOpen(false)
        // Aquí iría la lógica para cancelar la reserva
    }

    return (
        <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold">{session.serviceName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge className={statusColors[session.status]}>{session.status}</Badge>
                            <span className="text-sm text-gray-500">ID: {session.id}</span>
                        </div>
                    </div>

                    <Button variant="outline" size="sm" className="flex items-center gap-2 self-start" onClick={onEdit}>
                        <Edit className="h-4 w-4" />
                        Editar
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-gray-500" />
                        <div>
                            <p className="text-sm font-medium">Entrenador</p>
                            <p>{session.trainerName}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                            <p className="text-sm font-medium">Fecha</p>
                            <p>{new Date(session.date).toLocaleDateString("es-ES")}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <div>
                            <p className="text-sm font-medium">Horario</p>
                            <p>
                                {session.startTime} - {session.endTime}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-gray-500" />
                            <p className="text-sm font-medium">Ocupación</p>
                        </div>
                        <span className="text-sm">
                            {session.currentCapacity}/{session.maxCapacity} cupos
                        </span>
                    </div>
                    <Progress value={(session.currentCapacity / session.maxCapacity) * 100} className="h-2" />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Clientes inscritos</h3>

                {enrolledClients.length > 0 ? (
                    <div className="space-y-3">
                        {enrolledClients.map((client) => (
                            <div key={client.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={client.avatar} alt={client.name} />
                                        <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{client.name}</p>
                                        <p className="text-sm text-gray-500">{client.email}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => console.log("Ver perfil:", client)}>
                                        Ver perfil
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleCancelReservation(client)}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No hay clientes inscritos en esta sesión.</p>
                    </div>
                )}
            </div>

            <Separator />

            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>
                    Cerrar
                </Button>
            </div>

            <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cancelar reserva</DialogTitle>
                    </DialogHeader>

                    {selectedClient && (
                        <div className="space-y-4">
                            <p>
                                ¿Estás seguro de que deseas cancelar la reserva de <strong>{selectedClient.name}</strong>?
                            </p>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
                                    No, mantener
                                </Button>
                                <Button variant="destructive" onClick={confirmCancelReservation}>
                                    Sí, cancelar
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}