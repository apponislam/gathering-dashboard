import { LayoutDashboard, Users, Calendar, FileText, Bell } from "lucide-react";

export const MenuItems = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "User Management",
        url: "/users",
        icon: Users,
    },
    {
        title: "Event Management",
        url: "/events",
        icon: Calendar,
    },
    {
        title: "Content Moderation",
        url: "/content",
        icon: FileText,
    },
    {
        title: "Notifications",
        url: "/notifications",
        icon: Bell,
    },
];
