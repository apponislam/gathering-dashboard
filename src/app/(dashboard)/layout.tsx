import { AppSidebar } from "@/components/app-sidebar";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="bg-[#F7FAFC]">
            <AppSidebar />
            <main className="w-full p-4">
                {/* <SidebarTrigger /> */}
                {children}
                <RoleSwitcher />
            </main>
        </SidebarProvider>
    );
}
