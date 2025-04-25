"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// Definición de los datos de satisfacción por categoría
export interface SatisfactionData {
    categoria: string
    calificacion: number
    color: string
}

interface SatisfactionChartProps {
    data?: SatisfactionData[]
    title?: string
    description?: string
}

// Enhanced default data with meaningful colors
const defaultData: SatisfactionData[] = [
    { categoria: "Clases Grupales", calificacion: 4.5, color: "#4f46e5" },    // Indigo para servicios principales
    { categoria: "Equipamientos", calificacion: 4.7, color: "#059669" },      // Esmeralda para infraestructura
    { categoria: "Atención al Cliente", calificacion: 4.8, color: "#0ea5e9" } // Azul cielo para servicio al cliente
]

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload
        return (
            <div className="bg-white p-3 border rounded-lg shadow-lg">
                <p className="font-semibold text-sm mb-1">{data.categoria}</p>
                <p className="text-sm text-indigo-600 font-medium">
                    {`Calificación: ${data.calificacion.toFixed(1)}/5.0`}
                </p>
            </div>
        )
    }
    return null
}

export function SatisfactionChart({
    data = defaultData,
    title = "Satisfacción del Servicio",
    description = "Calificación promedio mensual por categoría"
}: SatisfactionChartProps) {
    // Calculate average satisfaction
    const averageSatisfaction = (
        data.reduce((sum, item) => sum + item.calificacion, 0) / data.length
    ).toFixed(1)

    return (
        <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
                <CardDescription className="text-gray-500">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <p className="text-3xl font-bold text-gray-900">{averageSatisfaction}/5.0</p>
                    <p className="text-sm text-gray-500">promedio general</p>
                </div>
                <div className="w-full h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 30,
                            }}
                            barSize={60}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis
                                dataKey="categoria"
                                stroke="#6b7280"
                                fontSize={12}
                                tickMargin={10}
                                angle={0}
                                interval={0}
                                textAnchor="middle"
                            />
                            <YAxis
                                domain={[0, 5]}
                                ticks={[0, 1, 2, 3, 4, 5]}
                                stroke="#6b7280"
                                fontSize={12}
                                tickMargin={10}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }} />
                            <Legend
                                wrapperStyle={{
                                    paddingTop: "20px",
                                    fontSize: "14px"
                                }}
                            />
                            <Bar
                                dataKey="calificacion"
                                name="Calificación"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={60}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
