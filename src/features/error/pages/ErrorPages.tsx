// src/features/error/pages/ErrorPage.tsx
import { useEffect } from 'react';
import { useRouteError, isRouteErrorResponse, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, RotateCw } from 'lucide-react';

type ErrorType =
    | '404'
    | '500'
    | '403'
    | 'generic';

interface ErrorPageProps {
    type?: ErrorType;
    error?: {
        title?: string;
        message?: string;
    };
}

const ErrorPage = ({ type = '404', error }: ErrorPageProps) => {
    const routerError = useRouteError();
    const navigate = useNavigate();

    // Manejador de errores de React Router
    const getRouterError = () => {
        if (!isRouteErrorResponse(routerError)) return null;

        return {
            title: 'Error inesperado',
            message: routerError.statusText || (routerError.data as { message?: string })?.message,
        };
    };

    // Configuración de errores
    const errorConfig = {
        '404': {
            title: 'Página no encontrada',
            message: 'La página que estás buscando no existe o fue removida.',
        },
        '500': {
            title: 'Error del servidor',
            message: 'Algo salió mal en nuestro servidor. Por favor intenta nuevamente más tarde.',
        },
        '403': {
            title: 'Acceso denegado',
            message: 'No tienes permisos para ver este contenido.',
        },
        'generic': {
            title: error?.title || 'Algo salió mal',
            message: error?.message || 'Por favor intenta nuevamente más tarde.',
        },
    };

    const { title, message } = errorConfig[type] || errorConfig.generic;
    const routerErrorInfo = getRouterError();

    useEffect(() => {
        // Opcional: Loggear el error
        if (routerError) {
            console.error('Routing Error:', routerError);
        }
    }, [routerError]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <AlertTriangle className="h-16 w-16 text-destructive" strokeWidth={1.5} />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {routerErrorInfo?.title || title}
                    </h1>
                    <p className="text-muted-foreground">
                        {routerErrorInfo?.message || message}
                    </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row justify-center">
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="gap-2"
                    >
                        <RotateCw className="h-4 w-4" />
                        Volver atrás
                    </Button>

                    <Button asChild className="gap-2">
                        <Link to="/">
                            <Home className="h-4 w-4" />
                            Ir al inicio
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;