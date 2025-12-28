// "use client";

// import { useEffect, useState } from "react";
// import DashboardOverview from "@/components/dashboard/adminOverview/DashboardOverview";
// import { EventsChart } from "@/components/dashboard/adminOverview/EventsChart";
// // import { PopularEventsChart } from "@/components/dashboard/adminOverview/PopularEventsChart";
// import UserEngagementOverview from "@/components/dashboard/adminOverview/UserEngagementOverview";
// import { OrganizerDashboardOverview } from "@/components/dashboard/organizerOverview/OrganizerDashboardOverview";
// import { TopRevenueEvents } from "@/components/dashboard/organizerOverview/TopRevenueEvents";
// import { EventsByCategory } from "@/components/dashboard/organizerOverview/EventsByCategory";
// import OrganizerEventsPage from "@/components/dashboard/organizerOverview/OrganizerEventsPage";

// const Page = () => {
//     const [role, setRole] = useState<string>("admin");
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setMounted(true);
//             const storedRole = localStorage.getItem("userRole") || "admin";
//             setRole(storedRole);
//         }, 0);

//         return () => clearTimeout(timer);
//     }, []);

//     if (!mounted) {
//         return null;
//     }

//     return (
//         <>
//             {role === "admin" ? (
//                 <>
//                     <DashboardOverview></DashboardOverview>
//                     <div className="mb-5">
//                         <h1 className="font-bold text-[#0D121C] text-2xl mb-5">Real-Time Performance Overview</h1>
//                         <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
//                             <UserEngagementOverview></UserEngagementOverview>
//                             <EventsChart></EventsChart>
//                         </div>
//                     </div>
//                     {/* <PopularEventsChart></PopularEventsChart> */}
//                 </>
//             ) : (
//                 // Organizer Dashboard
//                 <>
//                     <OrganizerDashboardOverview></OrganizerDashboardOverview>
//                     <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-4">
//                         <TopRevenueEvents></TopRevenueEvents>
//                         <EventsByCategory></EventsByCategory>
//                     </div>
//                     <OrganizerEventsPage></OrganizerEventsPage>
//                 </>
//             )}
//         </>
//     );
// };

// export default Page;

"use client";

import DashboardOverview from "@/components/dashboard/adminOverview/DashboardOverview";
import { EventsChart } from "@/components/dashboard/adminOverview/EventsChart";
import UserEngagementOverview from "@/components/dashboard/adminOverview/UserEngagementOverview";
import { OrganizerDashboardOverview } from "@/components/dashboard/organizerOverview/OrganizerDashboardOverview";
import { TopRevenueEvents } from "@/components/dashboard/organizerOverview/TopRevenueEvents";
import { EventsByCategory } from "@/components/dashboard/organizerOverview/EventsByCategory";
import OrganizerEventsPage from "@/components/dashboard/organizerOverview/OrganizerEventsPage";
import { useAppSelector } from "@/redux/hooks";
import { selectRole } from "@/redux/features/auth/authSlice";

const Page = () => {
    const role = useAppSelector(selectRole);

    const isAdmin = role === "admin" || role === "super_admin";
    const isOrganizer = role === "organizer";

    if (!role || (!isAdmin && !isOrganizer)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
                    <p className="text-gray-600">You don&apos;t have permission to view this dashboard.</p>
                    <p className="text-sm text-gray-500 mt-1">Current role: {role || "Not assigned"}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {isAdmin ? (
                // Admin & Super Admin Dashboard
                <>
                    <DashboardOverview />
                    <div className="mb-5">
                        <h1 className="font-bold text-[#0D121C] text-2xl mb-5">Real-Time Performance Overview</h1>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                            <UserEngagementOverview />
                            <EventsChart />
                        </div>
                    </div>
                    {/* <PopularEventsChart /> */}
                </>
            ) : (
                // Organizer Dashboard (for role === "organizer")
                <>
                    <OrganizerDashboardOverview />
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-4">
                        <TopRevenueEvents />
                        <EventsByCategory />
                    </div>
                    <OrganizerEventsPage />
                </>
            )}
        </>
    );
};

export default Page;
