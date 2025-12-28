"use client";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { menuItems } from "@/lib/navigation/MenuItems";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectRole } from "@/redux/features/auth/authSlice";
import { useGetUserProfileQuery } from "@/redux/features/user/userApi";
import { getImageUrl } from "@/utils/imageUrl";
import { baseApi } from "@/redux/api/baseApi";

export function AppSidebar() {
    const pathname = usePathname();
    const role = useAppSelector(selectRole);
    console.log(role);
    const items = role ? menuItems[role] : [];
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: myProfile } = useGetUserProfileQuery();
    console.log(myProfile);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
        router.push("/auth/login");
        router.refresh();
    };

    return (
        <Sidebar className="border-none">
            <SidebarContent className="bg-white rounded-3xl m-5 shadow-[0_16px_44px_0_rgba(0,0,0,0.07)] md:mr-0 flex flex-col justify-between h-full mr-5">
                <div>
                    <div className="p-6 pb-12 shrink-0 bg-white">
                        <Link href="/">
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
                                    <button onClick={handleLogout} className="flex items-center justify-center gap-3 px-4 py-3 h-auto rounded-full! transition-colors duration-200 bg-[#4F46E5] text-center text-white hover:bg-[#4F46E5]! hover:text-white! w-full cursor-pointer">
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </div>
                    <div className="border-t border-[#E2E8F0] p-4 flex items-center gap-3">
                        <Image src={getImageUrl(myProfile?.data?.profile) || "/avatar.png"} alt="Profile" width={40} height={40} className="rounded-full object-cover w-10 h-10" />
                        <div>
                            <h1 className="font-medium text-[#64748B] text-[12px]">{myProfile?.data?.email || "example@gmail.com"}</h1>
                            <p className="font-medium text-sm">{myProfile?.data?.role || "ROLE"}</p>
                        </div>
                    </div>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}
