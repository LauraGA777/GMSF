import { useState } from "react"
import { Search, Calendar, Filter, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

const availableSessions = [
    {
        id: 1,
        serviceId: 1,
        serviceName: "Yoga para principiantes",
        serviceType: "Yoga",
        description:
            "Clase ideal para personas que se inician en la práctica del yoga. Aprenderás posturas básicas y técnicas de respiración.",
        requirements: "Ropa cómoda, esterilla de yoga (opcional, el gimnasio dispone de algunas).",
        equipment: "Esterilla, bloques de yoga, cintas.",
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
        id: 3,
        serviceId: 3,
        serviceName: "Crossfit avanzado",
        serviceType: "Crossfit",
        description:
            "Entrenamiento de alta intensidad para personas con experiencia previa en Crossfit. Incluye ejercicios complejos y técnicos.",
        requirements: "Experiencia previa en Crossfit, buena condición física.",
        equipment: "Barras, discos, kettlebells, cajas de salto.",
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
        id: 5,
        serviceId: 5,
        serviceName: "Pilates mat",
        serviceType: "Pilates",
        description:
            "Clase de Pilates enfocada en fortalecer el core y mejorar la postura utilizando principalmente el peso corporal.",
        requirements: "Apto para todos los niveles.",
        equipment: "Esterilla, bandas elásticas, pelota pequeña.",
        trainerId: 5,
        trainerName: "Sofía López",
        date: "2025-03-23",
        startTime: "11:00",
        endTime: "12:00",
        maxCapacity: 15,
        currentCapacity: 8,
        status: "Disponible",
    },
]

export default function ClientReservationView() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [selectedTrainer, setSelectedTrainer] = useState<string>("all")
    const [selectedType, setSelectedType] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedSession, setSelectedSession] = useState<any>(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [isReservationSuccess, setIsReservationSuccess] = useState(false)

    // Filtrar sesiones según los criterios seleccionados
    const filteredSessions = availableSessions.filter((session) => {
        const matchesDate = !selectedDate || session.date === format(selectedDate, "yyyy-MM-dd")
        const matchesTrainer = selectedTrainer === "all" || session.trainerId.toString() === selectedTrainer
        const matchesType = selectedType === "all" || session.serviceType === selectedType
        const matchesSearch =
            !searchQuery ||
            session.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.trainerName.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesDate && matchesTrainer && matchesType && matchesSearch
    })

    const handleViewDetails = (session: any) => {
        setSelectedSession(session)
        setIsDetailOpen(true)
    }

    const handleReserve = () => {
        // Aquí iría la lógica para reservar
        console.log("Reservando sesión:", selectedSession)
        setIsReservationSuccess(true)
    }

    const handleCloseDetail = () => {
        setIsDetailOpen(false)
        setIsReservationSuccess(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    Servicios Disponibles
                </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-64 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Buscar servicios..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            Filtros
                        </h3>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">Fecha</p>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                            {selectedDate && (
                                <Button variant="ghost" size="sm" className="w-full mt-1" onClick={() => setSelectedDate(undefined)}>
                                    Limpiar fecha
                                </Button>
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">Entrenador</p>
                            <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Todos los entrenadores" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los entrenadores</SelectItem>
                                    {trainers.map((trainer) => (
                                        <SelectItem key={trainer.id} value={trainer.id.toString()}>
                                            {trainer.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">Tipo de Servicio</p>
                            <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Todos los servicios" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los servicios</SelectItem>
                                    {serviceTypes.map((type) => (
                                        <SelectItem key={type.id} value={type.name}>
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    {filteredSessions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredSessions.map((session) => (
                                <Card key={session.id} className="overflow-hidden">
                                    <CardContent className="p-0">
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold">{session.serviceName}</h4>
                                                <Badge className="bg-green-100 text-green-800">{session.serviceType}</Badge>
                                            </div>

                                            <div className="flex items-center gap-2 mb-2">
                                                <User className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm">{session.trainerName}</span>
                                            </div>

                                            <p className="text-sm text-gray-600 mb-2">
                                                {new Date(session.date).toLocaleDateString("es-ES", {
                                                    weekday: "long",
                                                    day: "numeric",
                                                    month: "long",
                                                })}
                                            </p>

                                            <p className="text-sm text-gray-600 mb-3">
                                                {session.startTime} - {session.endTime}
                                            </p>

                                            <div className="flex justify-between text-sm">
                                                <span>Cupos disponibles:</span>
                                                <span className="font-medium">
                                                    {session.maxCapacity - session.currentCapacity}/{session.maxCapacity}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-0 border-t">
                                        <Button
                                            variant="ghost"
                                            className="w-full rounded-none py-3"
                                            onClick={() => handleViewDetails(session)}
                                        >
                                            Ver detalles
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">No hay sesiones disponibles que coincidan con los filtros seleccionados.</p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => {
                                    setSelectedDate(undefined)
                                    setSelectedTrainer("all")
                                    setSelectedType("all")
                                    setSearchQuery("")
                                }}
                            >
                                Limpiar filtros
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={isDetailOpen} onOpenChange={handleCloseDetail}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Detalles del Servicio</DialogTitle>
                    </DialogHeader>

                    {selectedSession && !isReservationSuccess && (
                        <div className="space-y-6">
                            <Tabs defaultValue="details">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="details">Información</TabsTrigger>
                                    <TabsTrigger value="requirements">Requisitos</TabsTrigger>
                                </TabsList>

                                <TabsContent value="details" className="space-y-4 pt-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold">{selectedSession.serviceName}</h3>
                                            <Badge className="mt-1 bg-green-100 text-green-800">{selectedSession.serviceType}</Badge>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">Cupos disponibles</p>
                                            <p className="text-lg font-bold">
                                                {selectedSession.maxCapacity - selectedSession.currentCapacity}/{selectedSession.maxCapacity}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium">Entrenador</p>
                                            <p>{selectedSession.trainerName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Fecha y hora</p>
                                            <p>
                                                {new Date(selectedSession.date).toLocaleDateString("es-ES", {
                                                    weekday: "long",
                                                    day: "numeric",
                                                    month: "long",
                                                })}
                                                , {selectedSession.startTime} - {selectedSession.endTime}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">Descripción</h4>
                                        <p className="text-gray-700">{selectedSession.description}</p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="requirements" className="space-y-4 pt-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Requisitos</h4>
                                        <p className="text-gray-700">{selectedSession.requirements}</p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-2">Equipamiento</h4>
                                        <p className="text-gray-700">{selectedSession.equipment}</p>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <div className="flex justify-end">
                                <Button onClick={handleReserve}>Reservar Cupo</Button>
                            </div>
                        </div>
                    )}

                    {isReservationSuccess && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">¡Reserva Confirmada!</h3>
                            <p className="text-gray-600 mb-6">
                                Has reservado un cupo para {selectedSession?.serviceName} el{" "}
                                {new Date(selectedSession?.date).toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                })}{" "}
                                de {selectedSession?.startTime} a {selectedSession?.endTime}.
                            </p>
                            <Button onClick={handleCloseDetail}>Cerrar</Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
