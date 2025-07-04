import { useState, useEffect, useCallback } from "react"
import { ProtectedRoute } from "../../auth/components/protectedRoute"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog"
import { TrainingForm } from "@/features/schedule/components/TrainingForm"
import { TrainingDetailsForm } from "@/features/schedule/components/TrainingDetailsForm"
import { useAuth } from "@/shared/contexts/authContext"
import Swal from "sweetalert2"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { ScheduleComponent } from "@/features/schedule/components/ScheduleComponent"
import { scheduleService } from "@/features/schedule/services/schedule.service"
import { Training } from "@/shared/types/training"
import { useToast } from "@/shared/components/ui/use-toast"
import { ScheduleSkeleton } from "@/shared/components/ui/schedule-skeleton"
import { EmptyState } from "@/shared/components/ui/empty-state"
import { Calendar, Plus } from "lucide-react"
import { Button } from "@/shared/components/ui/button"

export function SchedulePage() {
    const { user } = useAuth()
    const { toast } = useToast()
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isEditFormOpen, setIsEditFormOpen] = useState(false)
    const [selectedTraining, setSelectedTraining] = useState<Training | null>(null)
    const [initialDates, setInitialDates] = useState<{ start?: Date, end?: Date }>({});
    const [fetchedTrainings, setFetchedTrainings] = useState<Training[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [trainers, setTrainers] = useState<Array<{ id: string; name: string }>>([])
    const [clientsWithActiveContracts, setClientsWithActiveContracts] = useState<{ id: string; name: string }[]>([])

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true)
            
            const clientsPromise = scheduleService.getActiveClients();
            const trainersPromise = scheduleService.getActiveTrainers();
            // Fetch all trainings, FullCalendar will handle filtering by view
            const trainingsPromise = scheduleService.getTrainings({});
            
            const [clientsResponse, trainersResponse, trainingsResponse] = await Promise.all([
                clientsPromise,
                trainersPromise,
                trainingsPromise
            ]);

            if (clientsResponse.data) {
                const mappedClients = clientsResponse.data
                    .filter((c: any) => c && c.id)
                    .map((c: any) => ({
                        id: c.id.toString(),
                        name: `${c.nombre} ${c.apellido}`
                    }));
                setClientsWithActiveContracts(mappedClients)
            }
            
            if (trainersResponse.data) {
                const mappedTrainers = trainersResponse.data
                    .filter((t: any) => t && t.id && t.name)
                    .map((t: any) => ({
                        id: t.id.toString(),
                        name: t.name,
                    }));
                setTrainers(mappedTrainers);
            }

            if (trainingsResponse.data) {
                // Filter trainings based on user role on the client side
                let filtered = trainingsResponse.data;
                if (user?.role === "CLIENTE" && user.personId) {
                    filtered = filtered.filter((training) => training.id_cliente?.toString() === user.personId)
                }
                else if (user?.role === "ENTRENADOR" && user.trainerId) {
                    filtered = filtered.filter((training) => training.id_entrenador?.toString() === user.trainerId)
                }
                setFetchedTrainings(filtered);
            }

            setError(null)
        } catch (err) {
            setError("Error al cargar los datos")
            console.error("Error fetching data:", err)
            setFetchedTrainings([])
            setClientsWithActiveContracts([])
            setTrainers([])
        } finally {
            setIsLoading(false)
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData])


    const handleSubmitTraining = async (data: Partial<Training>) => {
        const isUpdating = "id" in data
        try {
            if (isUpdating) {
                await scheduleService.updateTraining(data.id!, data)
                toast({ title: "Éxito", description: "Entrenamiento actualizado.", type: "success" })
            } else {
                await scheduleService.createTraining(data)
                toast({ title: "Éxito", description: "Entrenamiento creado.", type: "success" })
            }
            fetchData()
            handleCloseForm()
            return Promise.resolve()
        } catch (error) {
            const description = isUpdating ? "No se pudo actualizar" : "No se pudo crear"
            console.error(`${description} el entrenamiento:`, error)
            toast({
                title: "Error",
                description: `${description} el entrenamiento. Inténtelo de nuevo.`,
                type: "error",
            })
            throw error
        }
    }

    const handleUpdateTrainingDate = async (trainingId: number, newStartDate: Date, newEndDate: Date) => {
        try {
            await scheduleService.updateTraining(trainingId, { 
                fecha_inicio: newStartDate.toISOString(),
                fecha_fin: newEndDate.toISOString()
            });
            toast({ title: "Éxito", description: "El entrenamiento ha sido reagendado.", type: "success" });
            fetchData();
        } catch (error) {
            console.error("Error updating training date:", error);
            toast({ title: "Error", description: "No se pudo reagendar el entrenamiento.", type: "error" });
            // Optionally refetch to revert the change in the UI
            fetchData();
        }
    };
    
    const handleTrainingClick = (training: Training) => {
        setSelectedTraining(training)
        setIsEditFormOpen(true)
    }

    const handleDeleteTraining = async (id: number) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Sí, cancelar",
            cancelButtonText: "No",
        })

        if (result.isConfirmed) {
            try {
                await scheduleService.cancelTraining(id)
                toast({ title: "Éxito", description: "El entrenamiento ha sido cancelado.", type: "success" })
                fetchData()
                handleCloseForm()
            } catch (error) {
                console.error("Error al cancelar el entrenamiento:", error)
                toast({ title: "Error", description: "No se pudo cancelar el entrenamiento.", type: "error" })
            }
        }
    }

    const handleAddTraining = (selection?: { start?: Date, end?: Date }) => {
        setSelectedTraining(null);
        setInitialDates({ start: selection?.start, end: selection?.end });
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false)
        setIsEditFormOpen(false)
        setSelectedTraining(null)
        setInitialDates({});
    }

    return (
        <ProtectedRoute>
            <div className="flex flex-col h-full p-4 sm:p-6 space-y-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                            <Calendar className="h-6 w-6" />
                            Agenda de Entrenamientos
                        </CardTitle>
                        {user?.role !== 'CLIENTE' && (
                            <Button onClick={() => handleAddTraining()}>
                                <Plus className="mr-2 h-4 w-4" />
                                Agendar
                            </Button>
                        )}
                    </CardHeader>
                </Card>
                <div className="flex-grow min-h-0">
                    {isLoading ? (
                        <ScheduleSkeleton />
                    ) : error ? (
                        <EmptyState title="Error" message={error} />
                    ) : (
                        <ScheduleComponent
                            trainings={fetchedTrainings}
                            onTrainingClick={handleTrainingClick}
                            onAddTraining={handleAddTraining}
                            onUpdateTrainingDate={handleUpdateTrainingDate}
                        />
                    )}
                </div>
            </div>

            <Dialog open={isFormOpen || isEditFormOpen} onOpenChange={handleCloseForm}>
                <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>{selectedTraining ? "Detalles del Entrenamiento" : "Agendar Nuevo Entrenamiento"}</DialogTitle>
                        <DialogDescription>
                            {selectedTraining ? "Puedes ver o modificar los detalles del entrenamiento aquí." : "Completa el formulario para agendar un nuevo entrenamiento."}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedTraining ? (
                        <TrainingDetailsForm
                            training={selectedTraining}
                            onDelete={() => handleDeleteTraining(selectedTraining.id)}
                            onClose={handleCloseForm}
                            onUpdate={(data) => handleSubmitTraining({ id: selectedTraining.id, ...data })}
                            trainers={trainers}
                            clients={clientsWithActiveContracts}
                        />
                    ) : (
                        <TrainingForm
                            onSubmit={handleSubmitTraining}
                            onCancel={handleCloseForm}
                            trainers={trainers}
                            clients={clientsWithActiveContracts}
                            initialStartDate={initialDates.start}
                            initialEndDate={initialDates.end}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </ProtectedRoute>
    )
}

export default SchedulePage