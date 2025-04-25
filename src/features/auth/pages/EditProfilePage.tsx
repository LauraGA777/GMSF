import ProfileEditor from "@/components/auth/EditProfileCard"
import { NavBar } from "@/components/layout/nav-bar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export default function ProfileEditorPage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <NavBar />
                <main className="container mx-auto py-6 px-4 md:px-6">
                    <ProfileEditor />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}