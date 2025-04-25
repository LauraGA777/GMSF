import { useEffect, useState } from "react"

export function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < breakpoint)
        }

        // Verificar inicialmente
        checkIsMobile()

        // Agregar listener para cambios de tamaño
        window.addEventListener("resize", checkIsMobile)

        // Limpiar listener
        return () => window.removeEventListener("resize", checkIsMobile)
    }, [breakpoint])

    return isMobile
}