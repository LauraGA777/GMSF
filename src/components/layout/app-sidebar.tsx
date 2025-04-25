import React from "react"
import {
    ChevronDown,
    LayoutDashboard,
    Dumbbell,
    Users,
    MessageSquare,
    Settings,
    UserCog,
    ClipboardList,
    BadgeCheck,
    FileText,
    UserCircle,
    Clock,
    User,
    Tag,
    LogOut,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { useAuth } from "@/providers/auth/AuthProvider"
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import miImagen from "@/assets/icons/Vector.svg";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [serviciosOpen, setServiciosOpen] = React.useState(false)
    const [clientesOpen, setClientesOpen] = React.useState(false)
    const [retroOpen, setRetroOpen] = React.useState(false)
    const [configOpen, setConfigOpen] = React.useState(false)
    const { logout } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
        window.location.reload();
        toast({
            title: "Sesión cerrada",
            description: "Has salido correctamente del sistema",
        })
    }

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu >
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-primary-foreground">
                                    <img className="mt-2" src={miImagen} />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">GMSF</span>
                                    <span className="text-xs text-muted-foreground">StrongFit GYM</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {/* Dashboard - ítem principal sin subelementos */}
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/dashboard">
                                    <LayoutDashboard className="h-4 w-4" />
                                    <span>Dashboard</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {/* Usuarios - ítem principal sin subelementos */}
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/usuario">
                                    <User className="h-4 w-4" />
                                    <span>Usuarios</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {/* Servicios & Entrenadores - grupo colapsable */}
                        <Collapsible className="w-full group/collapsible" open={serviciosOpen} onOpenChange={setServiciosOpen}>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="w-full cursor-pointer" onClick={() => setServiciosOpen(!serviciosOpen)}>
                                    <Dumbbell className="h-4 w-4" />
                                    <span>Servicios & Entrenadores</span>
                                    <ChevronDown
                                        className={`ml-auto h-4 w-4 shrink-0 transition-transform duration-200 ${serviciosOpen ? "rotate-180" : ""}`}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <a href="#">
                                                <ClipboardList className="h-4 w-4 mr-2" />
                                                Servicios
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <a href="#">
                                                <UserCog className="h-4 w-4 mr-2" />
                                                Entrenadores
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </Collapsible>

                        {/* Clientes & Membresías - grupo colapsable */}
                        <Collapsible className="w-full group/collapsible" open={clientesOpen} onOpenChange={setClientesOpen}>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="w-full cursor-pointer" onClick={() => setClientesOpen(!clientesOpen)}>
                                    <Users className="h-4 w-4" />
                                    <span>Clientes & Membresías</span>
                                    <ChevronDown
                                        className={`ml-auto h-4 w-4 shrink-0 transition-transform duration-200 ${clientesOpen ? "rotate-180" : ""}`}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <a href="/membresia">
                                                <BadgeCheck className="h-4 w-4 mr-2" />
                                                Membresías
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <a href="#">
                                                <FileText className="h-4 w-4 mr-2" />
                                                Contratos
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <a href="#">
                                                <UserCircle className="h-4 w-4 mr-2" />
                                                Personas
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <a href="#">
                                                <Clock className="h-4 w-4 mr-2" />
                                                Asistencias
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </Collapsible>

                        {/* Retroalimentación - grupo colapsable */}
                        <Collapsible className="w-full group/collapsible" open={retroOpen} onOpenChange={setRetroOpen}>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="w-full cursor-pointer" onClick={() => setRetroOpen(!retroOpen)}>
                                    <MessageSquare className="h-4 w-4" />
                                    <span>Retroalimentación</span>
                                    <ChevronDown
                                        className={`ml-auto h-4 w-4 shrink-0 transition-transform duration-200 ${retroOpen ? "rotate-180" : ""}`}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <a href="#">
                                                <ClipboardList className="h-4 w-4 mr-2" />
                                                Encuestas
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </Collapsible>

                        {/* Configuración - grupo colapsable */}
                        <Collapsible className="w-full group/collapsible" open={configOpen} onOpenChange={setConfigOpen}>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="w-full cursor-pointer" onClick={() => setConfigOpen(!configOpen)}>
                                    <Settings className="h-4 w-4" />
                                    <span>Configuración</span>
                                    <ChevronDown
                                        className={`ml-auto h-4 w-4 shrink-0 transition-transform duration-200 ${configOpen ? "rotate-180" : ""}`}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>
                                        <SidebarMenuSubButton asChild>
                                            <a href="/">
                                                <Tag className="h-4 w-4 mr-2" />
                                                Roles
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleLogout} className="text-red-500 hover:text-red-700 hover:bg-red-100">
                            <LogOut className="h-4 w-4" />
                            <span>Cerrar Sesión</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}