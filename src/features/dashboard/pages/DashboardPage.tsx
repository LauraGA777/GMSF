import { AlertTriangle, ArrowUp, Users } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavBar } from "@/components/layout/nav-bar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export default function Dashboard() {
    const [period, setPeriod] = useState("monthly")

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <NavBar />
                <div className="flex min-h-screen w-full flex-col bg-background p-4 md:p-8">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Membresías</h2>
                        <div className="flex items-center space-x-2">
                            <Tabs defaultValue="monthly" className="space-y-4" onValueChange={setPeriod}>
                                <TabsList>
                                    <TabsTrigger value="weekly">Semanal</TabsTrigger>
                                    <TabsTrigger value="monthly">Mensual</TabsTrigger>
                                    <TabsTrigger value="yearly">Anual</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </div>

                    {/* Estado de las Membresías (sección superior) */}
                    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3 mt-6">
                        <Card className="border-red-500 border-2">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Membresías Canceladas</CardTitle>
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-2">
                                    <Badge variant="destructive" className="text-xl py-1.5 px-3">
                                        24
                                    </Badge>
                                    <div className="text-sm text-muted-foreground">
                                        <span className="flex items-center text-red-500">
                                            <ArrowUp className="mr-1 h-4 w-4" />
                                            12%
                                        </span>
                                        <span>desde el mes pasado</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Ingresos por Ventas de Membresías(Mensuales)</CardTitle>
                                <ArrowUp className="h-5 w-5 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$3'000.000</div>
                                <p className="text-xs text-muted-foreground">+8% desde el periodo anterior</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Membresías Activas</CardTitle>
                                <Users className="h-5 w-5 text-blue-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">2,345</div>
                                <p className="text-xs text-muted-foreground">+5.2% desde el periodo anterior</p>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Secciones de Preferencias e Ingresos  */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-6">

                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>Preferencia de Membresías (Clientes Frecuentes)</CardTitle>
                                <CardDescription>Distribución de membresías entre clientes con más de 1 año</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <PieChart />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

function PieChart() {
    // Datos de ejemplo para el gráfico circular
    const data = [
        { name: "Premium", value: 45, color: '#0088FE' },
        { name: "Estándar", value: 30, color: '#00C49F' },
        { name: "Básica", value: 25, color: '#FFBB28' },
    ]

    return (
        <div className="flex items-center justify-between h-[300px]">
            <div className="relative w-[200px] h-[200px]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    {data.map((segment, i) => {
                        // Calcular posición en el círculo
                        const previousSegments = data.slice(0, i).reduce((sum, s) => sum + s.value, 0)
                        const startAngle = (previousSegments / 100) * 360
                        const endAngle = ((previousSegments + segment.value) / 100) * 360

                        // Convertir a coordenadas
                        const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180))
                        const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180))
                        const endX = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180))
                        const endY = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180))

                        // Determinar si el arco es mayor que 180 grados
                        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

                        // Crear el path para el segmento
                        const path = [`M 50 50`, `L ${startX} ${startY}`, `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`, `Z`].join(
                            " ",
                        )

                        return <path key={i} d={path} fill={segment.color} />
                    })}
                    <circle cx="50" cy="50" r="25" fill="white" />
                </svg>
            </div>

            <div className="flex flex-col space-y-4">
                {data.map((segment, i) => (
                    <div key={i} className="flex items-center">
                        <div className="w-4 h-4 mr-2" style={{ backgroundColor: segment.color }}></div>
                        <div className="flex justify-between w-full">
                            <span className="font-medium">{segment.name}</span>
                            <span className="text-muted-foreground">{segment.value}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}