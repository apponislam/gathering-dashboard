"use client";

import { useEffect, useState } from "react";
import DashboardOverview from "@/components/dashboard/adminOverview/DashboardOverview";
import { EventsChart } from "@/components/dashboard/adminOverview/EventsChart";
import { PopularEventsChart } from "@/components/dashboard/adminOverview/PopularEventsChart";
import UserEngagementOverview from "@/components/dashboard/adminOverview/UserEngagementOverview";
import { OrganizerDashboardOverview } from "@/components/dashboard/organizerOverview/OrganizerDashboardOverview";
import { TopRevenueEvents } from "@/components/dashboard/organizerOverview/TopRevenueEvents";
import { EventsByCategory } from "@/components/dashboard/organizerOverview/EventsByCategory";

const Page = () => {
    const [role, setRole] = useState<string>("admin");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
            const storedRole = localStorage.getItem("userRole") || "admin";
            setRole(storedRole);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <>
            {role === "admin" ? (
                // Admin Dashboard
                <>
                    <DashboardOverview></DashboardOverview>
                    <div className="mb-5">
                        <h1 className="font-bold text-[#0D121C] text-2xl mb-5">Real-Time Performance Overview</h1>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                            <UserEngagementOverview></UserEngagementOverview>
                            <EventsChart></EventsChart>
                        </div>
                    </div>
                    <PopularEventsChart></PopularEventsChart>
                </>
            ) : (
                // Organizer Dashboard
                <>
                    <OrganizerDashboardOverview></OrganizerDashboardOverview>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                        <TopRevenueEvents></TopRevenueEvents>
                        <EventsByCategory></EventsByCategory>
                    </div>
                </>
            )}
        </>
    );
};

export default Page;
