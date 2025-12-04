// import { LayoutDashboard, Users, Calendar, FileText, Bell } from "lucide-react";

// export const MenuItems = [
//     {
//         title: "Dashboard",
//         url: "/",
//         icon: LayoutDashboard,
//     },
//     {
//         title: "User Management",
//         url: "/users-management",
//         icon: Users,
//     },
//     {
//         title: "Event Management",
//         url: "/events-management",
//         icon: Calendar,
//     },
//     {
//         title: "Content Moderation",
//         url: "/content-moderation",
//         icon: FileText,
//     },
//     {
//         title: "Notifications",
//         url: "/notifications",
//         icon: Bell,
//     },
// ];

"use client";
import { LayoutDashboard, Users, Calendar, FileText, Bell, Megaphone, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

export interface MenuItem {
    title: string;
    url: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const menuItems: Record<string, MenuItem[]> = {
    admin: [
        {
            title: "Dashboard",
            url: "/",
            icon: LayoutDashboard,
        },
        {
            title: "User Management",
            url: "/users-management",
            icon: Users,
        },
        {
            title: "Event Management",
            url: "/events-management",
            icon: Calendar,
        },
        {
            title: "Content Moderation",
            url: "/content-moderation",
            icon: FileText,
        },
        {
            title: "Notifications",
            url: "/notifications",
            icon: Bell,
        },
    ],
    organizer: [
        {
            title: "Dashboard",
            url: "/",
            icon: LayoutDashboard,
        },
        {
            title: "Event",
            url: "/my-events",
            icon: Calendar,
        },
        {
            title: "Promotions",
            url: "/promotions",
            icon: Megaphone,
        },
        {
            title: "Messages",
            url: "/messages",
            icon: MessageSquare,
        },
    ],
};

export const useUserRole = () => {
    const [role, setRole] = useState<string>("admin");

    useEffect(() => {
        const savedRole = localStorage.getItem("userRole");
        if (savedRole) {
            const timer = setTimeout(() => {
                setRole(savedRole);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, []);

    const setUserRole = (newRole: string) => {
        setRole(newRole);
        localStorage.setItem("userRole", newRole);
    };

    return { role, setUserRole };
};

export const getDefaultRole = (): string => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("userRole") || "admin";
    }
    return "admin";
};
