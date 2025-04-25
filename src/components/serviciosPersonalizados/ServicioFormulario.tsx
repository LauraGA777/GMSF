import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"

const services = [
    { id: 1, name: "Yoga para principiantes", type: "Yoga" },
    { id: 2, name: "Entrenamiento HIIT", type: "Entrenamiento Personal" },
    { id: 3, name: "Crossfit avanzado", type: "Crossfit" },
    { id: 4, name: "Yoga restaurativo", type: "Yoga" },
    { id: 5, name: "Pilates mat", type: "Pilates" },
]

const trainers = [
    { id: 1, name: "Ana García", specialty: "Yoga" },
    { id: 2, name: "Carlos Pérez", specialty: "Entrenamiento Personal" },
    { id: 3, name: "Laura Martínez", specialty: "Crossfit" },
    { id: 4, name: "Miguel Rodríguez", specialty: "Yoga" },
    { id: 5, name: "Sofía López", specialty: "Pilates" },
]

const statusOptions = [
    { id: 1, name: "Disponible" },
    { id: 2, name: "Completo" },
    { id: 3, name: "Cancelado" },
]

// Conflictos de horario simulados
const trainerConflicts = [
    {
        trainerId: 1,
        date: "2025-03-22",
        startTime: "08:30",
        endTime: "10:30",
        serviceName: "Yoga para principiantes",
    },
    {
        trainerId: 2,
        date: "2025-03-22",
        startTime: "11:00",
        endTime: "12:00",
        serviceName: "Entrenamiento HIIT",
    },
]

interface ServiceFormProps {
    isEditMode: boolean
    initialData?: any
    onClose: () => void
}

export default function ServiceForm({ isEditMode, initialData, onClose }: ServiceFormProps) {
    const [formData, setFormData] = useState({
        serviceId: "",
        trainerId: "",
        date: new Date(),
        startTime: "09:00",
        endTime: "10:00",
        maxCapacity: "10",
        status: "Disponible",
    })

    const [selectedServiceType, setSelectedServiceType] = useState("")
    const [conflicts, setConflicts] = useState<any[]>([])

    useEffect(() => {
        if (isEditMode && initialData) {
            setFormData({
                serviceId: initialData.serviceId.toString(),
                trainerId: initialData.trainerId.toString(),
                date: new Date(initialData.date),
                startTime: initialData.startTime,
                endTime: initialData.endTime,
                maxCapacity: initialData.maxCapacity.toString(),
                status: initialData.status,
            })

            // Establecer el tipo de servicio basado en el servicio seleccionado
            const service = services.find((s) => s.id === initialData.serviceId)
            if (service) {
                setSelectedServiceType(service.type)
            }
        }
    }, [isEditMode, initialData])

    useEffect(() => {
        // Actualizar el tipo de servicio cuando cambia el servicio seleccionado
        if (formData.serviceId) {
            const service = services.find((s) => s.id.toString() === formData.serviceId)
            if (service) {
                setSelectedServiceType(service.type)
                // Resetear el entrenador si cambia el tipo de servicio
                setFormData((prev) => ({ ...prev, trainerId: "" }))
            }
        }
    }, [formData.serviceId])

    useEffect(() => {
        // Verificar conflictos de horario cuando cambian los datos relevantes
        if (formData.trainerId && formData.date && formData.startTime && formData.endTime) {
            checkConflicts()
        } else {
            setConflicts([])
        }
    }, [formData.trainerId, formData.date, formData.startTime, formData.endTime])

    const checkConflicts = () => {
        const dateStr = format(formData.date, "yyyy-MM-dd")
        const selectedConflicts = trainerConflicts.filter((conflict) => {
            return (
                conflict.trainerId.toString() === formData.trainerId &&
                conflict.date === dateStr &&
                ((formData.startTime >= conflict.startTime && formData.startTime < conflict.endTime) ||
                    (formData.endTime > conflict.startTime && formData.endTime <= conflict.endTime) ||
                    (formData.startTime <= conflict.startTime && formData.endTime >= conflict.endTime))
            )
        })

        setConflicts(selectedConflicts)
    }

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Datos del formulario:", formData)
        // Aquí iría la lógica para guardar los datos
        onClose()
    }

    // Filtrar entrenadores por especialidad
    const filteredTrainers = trainers.filter(
        (trainer) => !selectedServiceType || trainer.specialty === selectedServiceType,
    )

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="service">Servicio</Label>
                        <Select value={formData.serviceId} onValueChange={(value) => handleChange("serviceId", value)} required>
                            <SelectTrigger id="service">
                                <SelectValue placeholder="Seleccionar servicio" />
                            </SelectTrigger>
                            <SelectContent>
                                {services.map((service) => (
                                    <SelectItem key={service.id} value={service.id.toString()}>
                                        {service.name} ({service.type})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="trainer">Entrenador</Label>
                        <Select
                            value={formData.trainerId}
                            onValueChange={(value) => handleChange("trainerId", value)}
                            disabled={!selectedServiceType}
                            required
                        >
                            <SelectTrigger id="trainer">
                                <SelectValue
                                    placeholder={selectedServiceType ? "Seleccionar entrenador" : "Primero seleccione un servicio"}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {filteredTrainers.map((trainer) => (
                                    <SelectItem key={trainer.id} value={trainer.id.toString()}>
                                        {trainer.name} ({trainer.specialty})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {!selectedServiceType && (
                            <p className="text-sm text-muted-foreground mt-1">
                                Primero seleccione un servicio para ver los entrenadores disponibles
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="date">Fecha</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal" id="date">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {formData.date ? format(formData.date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <CalendarComponent
                                    mode="single"
                                    selected={formData.date}
                                    onSelect={(date) => handleChange("date", date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label htmlFor="startTime">Hora de inicio</Label>
                            <div className="relative">
                                <Input
                                    id="startTime"
                                    type="time"
                                    value={formData.startTime}
                                    onChange={(e) => handleChange("startTime", e.target.value)}
                                    required
                                    className="w-15"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="endTime">Hora de fin</Label>
                            <div className="relative">
                                <Input
                                    id="endTime"
                                    type="time"
                                    value={formData.endTime}
                                    onChange={(e) => handleChange("endTime", e.target.value)}
                                    required
                                    className="w-15"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="maxCapacity">Cupo máximo</Label>
                        <Input
                            id="maxCapacity"
                            type="number"
                            min="1"
                            value={formData.maxCapacity}
                            onChange={(e) => handleChange("maxCapacity", e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="status">Estado inicial</Label>
                        <Select value={formData.status} onValueChange={(value) => handleChange("status", value)} required>
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((status) => (
                                    <SelectItem key={status.id} value={status.name}>
                                        {status.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {conflicts.length > 0 && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        <p className="font-semibold">Conflictos de horario detectados:</p>
                        <ul className="list-disc pl-5 mt-1">
                            {conflicts.map((conflict, index) => (
                                <li key={index}>
                                    {conflict.serviceName} ({conflict.startTime} - {conflict.endTime})
                                </li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={conflicts.length > 0}>
                    {isEditMode ? "Actualizar" : "Crear"} Sesión
                </Button>
            </div>
        </form>
    )
}