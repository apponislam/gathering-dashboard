import DashboardOverview from "@/components/dashboard/adminOverview/DashboardOverview";
import { EventsChart } from "@/components/dashboard/adminOverview/EventsChart";
import { PopularEventsChart } from "@/components/dashboard/adminOverview/PopularEventsChart";
import UserEngagementOverview from "@/components/dashboard/adminOverview/UserEngagementOverview";

export default function Home() {
    return (
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
    );
}
