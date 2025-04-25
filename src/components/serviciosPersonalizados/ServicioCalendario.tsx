import { useState } from "react"
import { Calendar, Plus, Copy, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ServiceForm from "@/components/serviciosPersonalizados/ServicioFormulario"
import ServiceDetail from "@/components/serviciosPersonalizados/ServicioDetalles"

// Datos de ejemplo
const trainers = [
    { id: 1, name: "Ana García", specialty: "Yoga" },
    { id: 2, name: "Carlos Pérez", specialty: "Entrenamiento Personal" },
    { id: 3, name: "Laura Martínez", specialty: "Crossfit" },
]

const serviceTypes = [
    { id: 1, name: "Yoga" },
    { id: 2, name: "Entrenamiento Personal" },
    { id: 3, name: "Crossfit" },
    { id: 4, name: "Pilates" },
]

const statusOptions = [
    { id: 1, name: "Disponible", color: "bg-green-100 text-green-800" },
    { id: 2, name: "Completo", color: "bg-red-100 text-red-800" },
    { id: 3, name: "Cancelado", color: "bg-gray-100 text-gray-800" },
]

const sessions = [
    {
        id: 1,
        serviceId: 1,
        serviceName: "Yoga para principiantes",
        trainerId: 1,
        trainerName: "Ana García",
        date: "2025-03-22",
        startTime: "09:00",
        endTime: "10:00",
        maxCapacity: 10,
        currentCapacity: 6,
        status: "Disponible",
    },
    {
        id: 2,
        serviceId: 2,
        serviceName: "Entrenamiento HIIT",
        trainerId: 2,
        trainerName: "Carlos Pérez",
        date: "2025-03-22",
        startTime: "11:00",
        endTime: "12:00",
        maxCapacity: 8,
        currentCapacity: 8,
        status: "Completo",
    },
    {
        id: 3,
        serviceId: 3,
        serviceName: "Crossfit avanzado",
        trainerId: 3,
        trainerName: "Laura Martínez",
        date: "2025-03-22",
        startTime: "15:00",
        endTime: "16:30",
        maxCapacity: 12,
        currentCapacity: 5,
        status: "Disponible",
    },
    {
        id: 4,
        serviceId: 1,
        serviceName: "Yoga restaurativo",
        trainerId: 1,
        trainerName: "Ana García",
        date: "2025-03-23",
        startTime: "10:00",
        endTime: "11:00",
        maxCapacity: 15,
        currentCapacity: 0,
        status: "Cancelado",
    },
]

export default function ServiceCalendar() {
    const [selectedTrainer, setSelectedTrainer] = useState<string>("all")
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [selectedType, setSelectedType] = useState<string>("all")
    const [selectedSession, setSelectedSession] = useState<any>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)

    // Filtrar sesiones según los criterios seleccionados
    const filteredSessions = sessions.filter((session) => {
        const matchesTrainer = selectedTrainer === "all" || session.trainerId.toString() === selectedTrainer
        const matchesStatus = selectedStatus === "all" || session.status === selectedStatus
        const matchesType = selectedType === "all" || session.serviceId.toString() === selectedType
        return matchesTrainer && matchesStatus && matchesType
    })

    // Agrupar sesiones por fecha
    const sessionsByDate = filteredSessions.reduce(
        (acc, session) => {
            if (!acc[session.date]) {
                acc[session.date] = []
            }
            acc[session.date].push(session)
            return acc
        },
        {} as Record<string, typeof sessions>,
    )

    const handleCreateSession = () => {
        setIsEditMode(false)
        setIsFormOpen(true)
    }

    const handleEditSession = (session: any) => {
        setSelectedSession(session)
        setIsEditMode(true)
        setIsFormOpen(true)
    }

    const handleViewSession = (session: any) => {
        setSelectedSession(session)
        setIsDetailOpen(true)
    }

    const handleDuplicateSession = (session: any) => {
        // Lógica para duplicar sesión
        console.log("Duplicar sesión:", session)
    }

    const handleCancelSession = (session: any) => {
        // Lógica para cancelar sesión
        console.log("Cancelar sesión:", session)
    }

    const getStatusColor = (status: string) => {
        const statusOption = statusOptions.find((option) => option.name === status)
        return statusOption?.color || "bg-gray-100 text-gray-800"
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    Calendario de Servicios
                </h2>

                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleCreateSession} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nueva Sesión
                    </Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                Filtros
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium">Entrenador</h4>
                                    <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Todos los entrenadores" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todos los entrenadores</SelectItem>
                                            {trainers.map((trainer) => (
                                                <SelectItem key={trainer.id} value={trainer.id.toString()}>
                                                    {trainer.name} ({trainer.specialty})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-medium">Estado</h4>
                                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Todos los estados" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todos los estados</SelectItem>
                                            {statusOptions.map((status) => (
                                                <SelectItem key={status.id} value={status.name}>
                                                    {status.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-medium">Tipo de Servicio</h4>
                                    <Select value={selectedType} onValueChange={setSelectedType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Todos los servicios" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todos los servicios</SelectItem>
                                            {serviceTypes.map((type) => (
                                                <SelectItem key={type.id} value={type.id.toString()}>
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="space-y-6">
                {Object.keys(sessionsByDate).length > 0 ? (
                    Object.entries(sessionsByDate).map(([date, dateSessions]) => (
                        <div key={date} className="space-y-3">
                            <h3 className="text-lg font-semibold">
                                {new Date(date).toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {dateSessions.map((session) => (
                                    <Card key={session.id} className="overflow-hidden">
                                        <CardContent className="p-0">
                                            <div className={`p-4 cursor-pointer`} onClick={() => handleViewSession(session)}>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold">{session.serviceName}</h4>
                                                    <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                                                </div>

                                                <p className="text-sm text-gray-600 mb-2">
                                                    {session.trainerName} • {session.startTime} - {session.endTime}
                                                </p>

                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-sm">
                                                        <span>
                                                            Cupos: {session.currentCapacity}/{session.maxCapacity}
                                                        </span>
                                                        <span>{Math.round((session.currentCapacity / session.maxCapacity) * 100)}%</span>
                                                    </div>
                                                    <Progress value={(session.currentCapacity / session.maxCapacity) * 100} className="h-2" />
                                                </div>
                                            </div>

                                            <div className="flex border-t">
                                                <button
                                                    className="flex-1 p-2 text-sm text-center hover:bg-gray-50 transition-colors border-r"
                                                    onClick={() => handleEditSession(session)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="flex-1 p-2 text-sm text-center hover:bg-gray-50 transition-colors border-r"
                                                    onClick={() => handleDuplicateSession(session)}
                                                >
                                                    <span className="flex items-center justify-center gap-1">
                                                        <Copy className="h-3 w-3" />
                                                        Duplicar
                                                    </span>
                                                </button>
                                                <button
                                                    className="flex-1 p-2 text-sm text-center text-red-600 hover:bg-red-50 transition-colors"
                                                    onClick={() => handleCancelSession(session)}
                                                >
                                                    <span className="flex items-center justify-center gap-1">
                                                        <X className="h-3 w-3" />
                                                        Cancelar
                                                    </span>
                                                </button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No hay sesiones que coincidan con los filtros seleccionados.</p>
                    </div>
                )}
            </div>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{isEditMode ? "Editar Sesión" : "Crear Nueva Sesión"}</DialogTitle>
                    </DialogHeader>
                    <ServiceForm isEditMode={isEditMode} initialData={selectedSession} onClose={() => setIsFormOpen(false)} />
                </DialogContent>
            </Dialog>

            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Detalle de Sesión</DialogTitle>
                    </DialogHeader>
                    <ServiceDetail
                        session={selectedSession}
                        onEdit={() => {
                            setIsDetailOpen(false)
                            setIsEditMode(true)
                            setIsFormOpen(true)
                        }}
                        onClose={() => setIsDetailOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}