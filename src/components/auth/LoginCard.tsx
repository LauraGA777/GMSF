import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { formSchemaLogin, FormValuesLogin } from "@/lib/FormSchemas"
import { useAuth } from "@/providers/auth/AuthProvider" // Importar useAuth

export default function LoginCard() {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const navigate = useNavigate()
    const { login } = useAuth() // Usar el hook useAuth para obtener la función login
    const [showContactInfo, setShowContactInfo] = useState(false)

    const form = useForm<FormValuesLogin>({
        resolver: zodResolver(formSchemaLogin),
        defaultValues: {
            correo: "",
            contrasena: "",
        },
    })

    async function onSubmit(data: FormValuesLogin) {
        setIsLoading(true);
        try {
            // Usar el método login del AuthProvider en lugar de llamar directamente al servicio
            await login({
                correo: data.correo,
                contrasena: data.contrasena
            });
            
            // El AuthProvider ya maneja el almacenamiento del token y la redirección
            toast({
                title: "Inicio exitoso",
                description: "Bienvenido a tu cuenta",
            });
            
            /* // La redirección ahora la maneja el AuthProvider, pero podemos mantenerla aquí como respaldo
            navigate("/dashboard", { replace: true }); */
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Ha ocurrido un error inesperado",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Card className="w-full max-w-md shadow-lg">
                {showContactInfo ? (
                    <>
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle className="text-2xl font-bold">Contacto del Administrador</CardTitle>
                            <CardDescription>Información para solicitar acceso al sistema</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg bg-gray-50 p-4">
                                <h3 className="mb-2 font-medium text-gray-900">StrongFit GYM</h3>
                                <p className="text-sm text-gray-700">
                                    <strong>Email:</strong> admin@strongfit.com
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Teléfono:</strong> 300 123 4567
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Horario de atención:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM
                                </p>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4">
                                <h3 className="mb-2 font-medium text-gray-900">Requisitos para solicitar acceso</h3>
                                <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                                    <li>Pertenecer a la organización</li>
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter>
                        <Button className="w-full" variant="outline" onClick={() => setShowContactInfo(false)}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Volver al inicio de sesión
                            </Button>
                        </CardFooter>
                    </>
                ) : (
                    <>
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle className="text-2xl font-bold">Bienvenido</CardTitle>
                            <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="correo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Ingrese su correo"
                                                        {...field}
                                                        className="transition-all focus-visible:ring-primary hover:border-primary/50"
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="contrasena"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Ingrese su contraseña"
                                                        {...field}
                                                        className="transition-all focus-visible:ring-primary hover:border-primary/50"
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="text-left">
                                        <a href="/forgot-password" className="text-sm text-primary hover:underline">
                                            ¿Olvidaste tu contraseña?
                                        </a>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full transition-all hover:opacity-90 active:scale-[0.98]"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Iniciando sesión...
                                            </>
                                        ) : (
                                            "Iniciar sesión"
                                        )}
                                    </Button>
                                    <div className="mt-4 text-center text-sm text-muted-foreground">
                                        ¿No tienes cuenta?{" "}
                                        <Button
                                            variant="link"
                                            className="h-auto p-0 text-primary hover:underline"
                                            onClick={() => setShowContactInfo(true)}
                                        >
                                            Contacta al administrador
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </>
                )}
            </Card>
        </>
    )
}