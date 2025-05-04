import { useLocation } from "react-router-dom"
import { UserMenu } from "@/shared/layout/UserMenu"
import { Menu, Home, Users, UserCog, Dumbbell, FileSignature, User, ClipboardCheck, MessageSquare } from "lucide-react"
import { Button } from "@/shared/components/button"
import { cn } from "@/shared/utils/utils"
import { useEffect, useState } from "react"
import { useAuth } from "@/shared/contexts/AuthContext"

interface HeaderProps {
  toggleSidebar: () => void
  currentSection?: string
}

export function Header({ toggleSidebar }: HeaderProps) {
  const { user } = useAuth()
  const location = useLocation()
  const [pathIcon, setPathIcon] = useState<React.ReactNode>(<Home />)
  const [breadcrumbItems, setBreadcrumbItems] = useState<string[]>([])

  // Actualiza el icono y las migas de pan basado en la ruta actual
  useEffect(() => {
    const path = location.pathname
    let icon = <Home />
    let items: string[] = []

    if (path.includes("/dashboard")) {
      icon = <Home />
      items = ["Panel de Control"]
    } else if (path.includes("/users")) {
      icon = <Users />
      items = ["Usuarios"]
    } else if (path.includes("/trainers")) {
      icon = <UserCog />
      items = ["Entrenadores"]
    } else if (path.includes("/services")) {
      icon = <Dumbbell />
      items = ["Servicios"]
    } else if (path.includes("/calendar")) {
      icon = <Dumbbell />
      items = user?.role === "client" ? ["Agenda"] : ["Servicios", "Agenda"]
    } else if (path.includes("/contracts")) {
      icon = <FileSignature />
      items = ["Ventas", "Contratos"]
    } else if (path.includes("/clients")) {
      icon = <User />
      items = ["Ventas", "Personas"]
    } else if (path.includes("/memberships")) {
      icon = <ClipboardCheck />
      items = ["Membresías"]
    } else if (path.includes("/attendance")) {
      icon = <ClipboardCheck />
      items = ["Membresías", "Asistencia"]
    } else if (path.includes("/surveys")) {
      icon = <MessageSquare />
      items = ["Encuestas"]
    }

    setPathIcon(icon)
    setBreadcrumbItems(items)
  }, [location.pathname, user])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/90 dark:border-gray-800">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={toggleSidebar}
          aria-label="Mostrar menú"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Breadcrumb navigation */}
        <div className="flex items-center overflow-hidden">
          <div className="flex items-center text-gray-500 mr-2 flex-shrink-0">
            {pathIcon}
          </div>
          <nav aria-label="Breadcrumb" className="flex overflow-hidden">
            <ol className="flex items-center space-x-2 overflow-hidden">
              {breadcrumbItems.map((item, index) => (
                <li key={item} className="flex items-center whitespace-nowrap">
                  {index > 0 && <span className="mx-2 text-gray-400 hidden xs:inline">/</span>}
                  <span className={cn(
                    "text-sm md:text-base font-medium truncate max-w-[100px] sm:max-w-[150px] md:max-w-none",
                    index === breadcrumbItems.length - 1 
                      ? "text-gray-800 font-semibold dark:text-gray-200" 
                      : "text-gray-500 dark:text-gray-400"
                  )}>
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="flex-1" />
        
        {/* Status indicator - green dot when user is active */}
        <div className="hidden md:flex items-center mr-4">
          <div className="flex items-center mr-2">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="text-sm text-gray-600">Activo</span>
          </div>
        </div>
        
        <UserMenu />
      </div>
    </header>
  )
}

