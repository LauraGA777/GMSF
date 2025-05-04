"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  LogOut,
  ChevronDown,
  ChevronUp,
  UserCog,
  Dumbbell,
  X,
  FileSignature,
  UserCheck,
  ClipboardCheck,
  BarChart4,
  User,
  ShoppingCartIcon,
  Settings,
  Shield,
} from "lucide-react"
import { Button } from "@/shared/components/button"
import { cn } from "@/shared/utils/utils"
import { useAuth } from "@/shared/contexts/AuthContext"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
  hasSubmenu?: boolean
  expanded?: boolean
  to?: string
  onClose?: () => void
  id?: string
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick, hasSubmenu, expanded, to, onClose, id }) => {
  const className = cn(
    "flex items-center w-full py-3 px-4 text-base font-normal transition duration-75 cursor-pointer",
    active
      ? "text-gray-700 bg-gray-100 hover:bg-gray-200"
      : "text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700",
  )

  const handleClick = () => {
    onClick()
    if (onClose && window.innerWidth < 768 && !hasSubmenu) {
      onClose()
    }
  }

  const content = (
    <>
      <span className="flex-shrink-0 text-gray-500 dark:text-gray-400">{icon}</span>
      <span className="ml-3 flex-1 whitespace-nowrap">{label}</span>
      {hasSubmenu && (
        <span className="flex-shrink-0 text-gray-400">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <li id={id} className="my-1">
        <Link to={to} className={className} onClick={handleClick}>
          {content}
        </Link>
      </li>
    )
  }

  return (
    <li id={id} className="my-1">
      <div className={className} onClick={handleClick}>
        {content}
      </div>
    </li>
  )
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const { logout, user } = useAuth()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    setShouldRender(!!user)
  }, [user])

  useEffect(() => {
    const path = location.pathname

    // Determinar el ítem activo basado en la ruta actual
    if (path.includes("/dashboard")) {
      setActiveItem("dashboard")
      setActiveGroup(null)
    } else if (path.includes("/users")) {
      setActiveItem("users")
      setActiveGroup(null)
    } else if (path.includes("/roles")) {
      setActiveItem("roles.list")
      setActiveGroup("settings")
    } else if (path.includes("/trainers")) {
      setActiveItem("trainers.list")
      setActiveGroup("services")
    } else if (path.includes("/services/custom")) {
      setActiveItem("services.custom")
      setActiveGroup("services")
    } else if (path.includes("/services")) {
      setActiveItem("services.list")
      setActiveGroup("services")
    } else if (path.includes("/calendar")) {
      setActiveItem("calendar")
      setActiveGroup(user?.role === "client" ? null : "services")
    } else if (path.includes("/my-contract")) {
      setActiveItem("my-contract")
      setActiveGroup(null)
    } else if (path.includes("/clients")) {
      setActiveItem("clients.list")
      setActiveGroup("clients")
    } else if (path.includes("/contracts")) {
      setActiveItem("contracts.list")
      setActiveGroup("clients")
    } else if (path.includes("/memberships")) {
      setActiveItem("memberships.list")
      setActiveGroup("memberships")
    } else if (path.includes("/attendance")) {
      setActiveItem("attendance.list")
      setActiveGroup("memberships")
    } else if (path.includes("/surveys")) {
      setActiveItem("surveys.list")
      setActiveGroup("feedback")
    }
  }, [location.pathname, user?.role])

  // Función para determinar si se debe mostrar un elemento basado en el rol de usuario
  const shouldShowItem = (allowedRoles: string[]) => {
    return user?.role && allowedRoles.includes(user.role)
  }

  const handleItemClick = (item: string, group: string | null = null) => {
    if (item === "logout") {
      logout()
      return
    }
    setActiveItem(item)
    setActiveGroup(group)
  }

  const toggleGroup = (group: string) => {
    setActiveGroup(activeGroup === group ? null : group)
  }

  // Clases para el sidebar basadas en el estado isOpen
  const sidebarClasses = cn(
    "fixed md:sticky top-0 left-0 z-30",
    "h-screen",
    "w-[280px] md:w-64",
    "transform transition-transform duration-300 ease-in-out",
    "flex flex-col shadow-md",
    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
  )

  if (!shouldRender) return null

  return (
    <aside className={sidebarClasses} aria-label="Sidebar">
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800">
        {/* Encabezado del Sidebar */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">GMSF</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="md:hidden p-1" aria-label="Cerrar menú">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Área de navegación con scroll */}
        <nav className="flex-1 overflow-y-auto py-4 text-base">
          <ul className="space-y-0">
            {/* 1. Panel de control - Solo para admin y trainer */}
            {shouldShowItem(["admin", "trainer"]) && (
              <NavItem
                icon={<LayoutDashboard className="h-5 w-5" aria-hidden="true" />}
                label="Panel de control"
                active={activeItem === "dashboard"}
                onClick={() => handleItemClick("dashboard")}
                to="/dashboard"
                onClose={onClose}
                id="nav-dashboard"
              />
            )}

            {/* 2. Usuarios - Solo para admin */}
            {shouldShowItem(["admin"]) && (
              <NavItem
                icon={<Users className="h-5 w-5" aria-hidden="true" />}
                label="Usuarios"
                active={activeItem === "users"}
                onClick={() => handleItemClick("users")}
                to="/users"
                onClose={onClose}
                id="nav-users"
              />
            )}

            {/* 4. Servicios - Solo para admin y trainer */}
            {shouldShowItem(["admin", "trainer"]) && (
              <>
                <NavItem
                  icon={<Dumbbell className="h-5 w-5" aria-hidden="true" />}
                  label="Servicios"
                  active={activeGroup === "services"}
                  onClick={() => toggleGroup("services")}
                  hasSubmenu={true}
                  expanded={activeGroup === "services"}
                  id="nav-services"
                />
                {activeGroup === "services" && (
                  <ul className="py-1 mx-4 border-l border-gray-100">
                    {/* Agenda */}
                    <li className="my-1">
                      <Link
                        to="/calendar"
                        className={cn(
                          "flex items-center w-full py-2 px-4 text-base font-normal transition duration-75 cursor-pointer ml-2",
                          activeItem === "calendar"
                            ? "text-gray-700 hover:bg-gray-100"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700",
                        )}
                        onClick={() => {
                          handleItemClick("calendar", "services")
                          if (window.innerWidth < 768) onClose()
                        }}
                      >
                        <span className="flex-shrink-0 text-gray-500 mr-3">
                          <Calendar className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="flex-1 whitespace-nowrap">Agenda</span>
                      </Link>
                    </li>
                    {/* Entrenadores */}
                    <li className="my-1">
                      <Link
                        to="/trainers"
                        className={cn(
                          "flex items-center w-full py-2 px-4 text-base font-normal transition duration-75 cursor-pointer ml-2",
                          activeItem === "trainers.list"
                            ? "text-gray-700 hover:bg-gray-100"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700",
                        )}
                        onClick={() => {
                          handleItemClick("trainers.list", "services")
                          if (window.innerWidth < 768) onClose()
                        }}
                      >
                        <span className="flex-shrink-0 text-gray-500 mr-3">
                          <UserCog className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="flex-1 whitespace-nowrap">Entrenadores</span>
                      </Link>
                    </li>
                    {/* Servicios */}
                    <li className="my-1">
                      <Link
                        to="/services"
                        className={cn(
                          "flex items-center w-full py-2 px-4 text-base font-normal transition duration-75 cursor-pointer ml-2",
                          activeItem === "services.list"
                            ? "text-gray-700 hover:bg-gray-100"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700",
                        )}
                        onClick={() => {
                          handleItemClick("services.list", "services")
                          if (window.innerWidth < 768) onClose()
                        }}
                      >
                        <span className="flex-shrink-0 text-gray-500 mr-3">
                          <Dumbbell className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="flex-1 whitespace-nowrap">Servicios</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </>
            )}

            {/* Agenda - Solo para clientes */}
            {shouldShowItem(["client"]) && (
              <NavItem
                icon={<Calendar className="h-5 w-5" aria-hidden="true" />}
                label="Agenda"
                active={activeItem === "calendar"}
                onClick={() => handleItemClick("calendar")}
                to="/calendar"
                onClose={onClose}
                id="nav-calendar-client"
              />
            )}

            {/* Mi Contrato - Solo para clientes */}
            {shouldShowItem(["client"]) && (
              <NavItem
                icon={<FileSignature className="h-5 w-5" aria-hidden="true" />}
                label="Mi Contrato"
                active={activeItem === "my-contract"}
                onClick={() => handleItemClick("my-contract")}
                to="/my-contract"
                onClose={onClose}
                id="nav-my-contract"
              />
            )}

            {/* 5. Clientes y contratos */}
            {shouldShowItem(["admin", "trainer"]) && (
              <>
                <NavItem
                  icon={<ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />}
                  label="Ventas"
                  active={activeGroup === "clients"}
                  onClick={() => toggleGroup("clients")}
                  hasSubmenu={true}
                  expanded={activeGroup === "clients"}
                  id="nav-clients"
                />
                {activeGroup === "clients" && (
                  <ul className="py-1 mx-4 border-l border-gray-100">
                    {/* Contratos */}
                    <li className="my-1">
                      <Link
                        to="/contracts"
                        className={cn(
                          "flex items-center w-full py-2 px-4 text-base font-normal transition duration-75 cursor-pointer ml-2",
                          activeItem === "contracts.list"
                            ? "text-gray-700 hover:bg-gray-100"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700",
                        )}
                        onClick={() => {
                          handleItemClick("contracts.list", "clients")
                          if (window.innerWidth < 768) onClose()
                        }}
                      >
                        <span className="flex-shrink-0 text-gray-500 mr-3">
                          <FileSignature className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="flex-1 whitespace-nowrap">Contratos</span>
                      </Link>
                    </li>
                    {/* Personas */}
                    <li className="my-1">
                      <Link
                        to="/clients"
                        className={cn(
                          "flex items-center w-full py-2 px-4 text-base font-normal transition duration-75 cursor-pointer ml-2",
                          activeItem === "clients.list"
                            ? "text-gray-700 hover:bg-gray-100"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700",
                        )}
                        onClick={() => {
                          handleItemClick("clients.list", "clients")
                          if (window.innerWidth < 768) onClose()
                        }}
                      >
                        <span className="flex-shrink-0 text-gray-500 mr-3">
                          <User className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="flex-1 whitespace-nowrap">Personas</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </>
            )}

            {/* 6. Membresías y asistencia */}
            {shouldShowItem(["admin", "trainer"]) && (
              <>
                <NavItem
                  icon={<UserCheck className="h-5 w-5" aria-hidden="true" />}
                  label="Membresías"
                  active={activeGroup === "memberships"}
                  onClick={() => toggleGroup("memberships")}
                  hasSubmenu={true}
                  expanded={activeGroup === "memberships"}
                  id="nav-memberships"
                />
                {activeGroup === "memberships" && (
                  <ul className="py-1 mx-4 border-l border-gray-100">
                    {/* Membresías */}
                    <li className="my-1">
                      <Link
                        to="/memberships"
                        className={cn(
                          "flex items-center w-full py-2 px-4 text-base font-normal transition duration-75 cursor-pointer ml-2",
                          activeItem === "memberships.list"
                            ? "text-gray-700 hover:bg-gray-100"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700",
                        )}
                        onClick={() => {
                          handleItemClick("memberships.list", "memberships")
                          if (window.innerWidth < 768) onClose()
                        }}
                      >
                        <span className="flex-shrink-0 text-gray-500 mr-3">
                          <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="flex-1 whitespace-nowrap">Membresías</span>
                      </Link>
                    </li>
                    {/* Asistencia */}
                    <li className="my-1">
                      <Link
                        to="/attendance"
                        className={cn(
                          "flex items-center w-full py-2 px-4 text-base font-normal transition duration-75 cursor-pointer ml-2",
                          activeItem === "attendance.list"
                            ? "text-gray-700 hover:bg-gray-100"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700",
                        )}
                        onClick={() => {
                          handleItemClick("attendance.list", "memberships")
                          if (window.innerWidth < 768) onClose()
                        }}
                      >
                        <span className="flex-shrink-0 text-gray-500 mr-3">
                          <BarChart4 className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="flex-1 whitespace-nowrap">Asistencia</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </>
            )}

            {/* 7. Retroalimentación - Encuestas */}
            {shouldShowItem(["admin", "trainer"]) && (
              <NavItem
                icon={<MessageSquare className="h-5 w-5" aria-hidden="true" />}
                label="Encuestas"
                active={activeItem === "surveys.list"}
                onClick={() => handleItemClick("surveys.list", "feedback")}
                to="/surveys"
                onClose={onClose}
                id="nav-surveys"
              />
            )}

            {/* 8. Configuración - Solo para admin */}
            {shouldShowItem(["admin"]) && (
              <>
                <NavItem
                  icon={<Settings className="h-5 w-5" aria-hidden="true" />}
                  label="Configuración"
                  active={activeGroup === "settings"}
                  onClick={() => toggleGroup("settings")}
                  hasSubmenu={true}
                  expanded={activeGroup === "settings"}
                  id="nav-settings"
                />
                {activeGroup === "settings" && (
                  <ul className="py-1 mx-4 border-l border-gray-100">
                    {/* Roles */}
                    <li className="my-1">
                      <Link
                        to="/roles"
                        className={cn(
                          "flex items-center w-full py-2 px-4 text-base font-normal transition duration-75 cursor-pointer ml-2",
                          activeItem === "roles.list"
                            ? "text-gray-700 hover:bg-gray-100"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700",
                        )}
                        onClick={() => {
                          handleItemClick("roles.list", "settings")
                          if (window.innerWidth < 768) onClose()
                        }}
                      >
                        <span className="flex-shrink-0 text-gray-500 mr-3">
                          <Shield className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="flex-1 whitespace-nowrap">Roles</span>
                      </Link>
                    </li>
                    
                  </ul>
                )}
              </>
            )}

            {/* Cerrar Sesión */}
            <NavItem
              icon={<LogOut className="h-5 w-5" aria-hidden="true" />}
              label="Cerrar Sesión"
              active={false}
              onClick={() => handleItemClick("logout")}
              onClose={onClose}
              id="nav-logout"
            />
          </ul>
        </nav>
      </div>
    </aside>
  )
}
