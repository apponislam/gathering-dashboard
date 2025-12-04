// "use client";
// import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { menuItems, useUserRole } from "@/lib/navigation/MenuItems";

// export function AppSidebar() {
//     const pathname = usePathname();
//     const { role } = useUserRole();
//     const items = menuItems[role];

//     return (
//         <Sidebar className="border-none">
//             <SidebarContent className="bg-white rounded-3xl m-5 shadow-[0_16px_44px_0_rgba(0,0,0,0.07)] mr-0 flex flex-col justify-between h-full">
//                 <div>
//                     <div className="p-6 pb-12 shrink-0 bg-white">
//                         <Link href="/">
//                             <Image src="/logo.svg" alt="Logo" width={138} height={32} />
//                         </Link>
//                     </div>
//                     <SidebarGroup className="p-4">
//                         <SidebarGroupContent>
//                             <SidebarMenu>
//                                 {items.map((item) => {
//                                     const isActive = pathname === item.url;
//                                     return (
//                                         <SidebarMenuItem key={item.title}>
//                                             <SidebarMenuButton asChild>
//                                                 <Link href={item.url} className={`flex items-center gap-3 px-4 py-3 h-auto rounded-full! transition-colors duration-200 ${isActive ? "bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#EEF2FF]! hover:text-[#4F46E5]!" : "text-[#2A2A2E] bg-transparent hover:bg-[#EEF2FF]! hover:text-[#4F46E5]!"}`}>
//                                                     <item.icon className="w-5 h-5" />
//                                                     <span className="font-medium">{item.title}</span>
//                                                 </Link>
//                                             </SidebarMenuButton>
//                                         </SidebarMenuItem>
//                                     );
//                                 })}
//                             </SidebarMenu>
//                         </SidebarGroupContent>
//                     </SidebarGroup>
//                 </div>
//                 <div>
//                     <div className="p-6 pt-0">
//                         <Image src="/appSidebar.svg" alt="App Sidebar" width={248} height={165} className="w-full"></Image>
//                         <SidebarMenu>
//                             <SidebarMenuItem>
//                                 <SidebarMenuButton asChild>
//                                     <button
//                                         onClick={() => console.log("Logging out...")}
//                                         className="flex items-center justify-center gap-3 px-4 py-3 h-auto rounded-full! transition-colors duration-200
//                                          bg-[#4F46E5] text-center text-white hover:bg-[#4F46E5]! hover:text-white! w-full cursor-pointer"
//                                     >
//                                         <span className="font-medium">Logout</span>
//                                     </button>
//                                 </SidebarMenuButton>
//                             </SidebarMenuItem>
//                         </SidebarMenu>
//                     </div>
//                     <div className="border-t border-[#E2E8F0] p-4 flex items-center gap-3">
//                         <Image src="/avatar.png" alt="Avatar" width={40} height={40}></Image>
//                         <div>
//                             <h1 className="font-medium text-[#64748B] text-sm">admin@gathering.app</h1>
//                             <p className="font-medium">Admin</p>
//                         </div>
//                     </div>
//                 </div>
//             </SidebarContent>
//         </Sidebar>
//     );
// }

"use client";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { menuItems, useUserRole } from "@/lib/navigation/MenuItems";

export function AppSidebar() {
    const pathname = usePathname();
    const { role } = useUserRole();
    const items = menuItems[role];

    return (
        <Sidebar className="border-none">
            <SidebarContent className="bg-white rounded-3xl m-5 shadow-[0_16px_44px_0_rgba(0,0,0,0.07)] mr-0 flex flex-col justify-between h-full">
                <div>
                    <div className="p-6 pb-12 shrink-0 bg-white">
                        <Link href={role === "admin" ? "/" : "/organizer"}>
                            <Image src="/logo.svg" alt="Logo" width={138} height={32} />
                        </Link>
                    </div>
                    <SidebarGroup className="p-4">
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => {
                                    const isActive = pathname === item.url;
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.url} className={`flex items-center gap-3 px-4 py-3 h-auto rounded-full! transition-colors duration-200 ${isActive ? "bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#EEF2FF]! hover:text-[#4F46E5]!" : "text-[#2A2A2E] bg-transparent hover:bg-[#EEF2FF]! hover:text-[#4F46E5]!"}`}>
                                                    <item.icon className="w-5 h-5" />
                                                    <span className="font-medium">{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </div>
                <div>
                    <div className="p-6 pt-0">
                        <Image src="/appSidebar.svg" alt="App Sidebar" width={248} height={165} className="w-full"></Image>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <button
                                        onClick={() => console.log("Logging out...")}
                                        className="flex items-center justify-center gap-3 px-4 py-3 h-auto rounded-full! transition-colors duration-200 
                                         bg-[#4F46E5] text-center text-white hover:bg-[#4F46E5]! hover:text-white! w-full cursor-pointer"
                                    >
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </div>
                    <div className="border-t border-[#E2E8F0] p-4 flex items-center gap-3">
                        <Image src="/avatar.png" alt="Avatar" width={40} height={40}></Image>
                        <div>
                            <h1 className="font-medium text-[#64748B] text-[12px]">{role === "admin" ? "admin@gathering.app" : "organizer@gathering.app"}</h1>
                            <p className="font-medium text-sm">{role === "admin" ? "Admin" : "Organizer"}</p>
                        </div>
                    </div>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}
