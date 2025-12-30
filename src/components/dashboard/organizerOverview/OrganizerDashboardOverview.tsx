// import { Card, CardContent } from "@/components/ui/card";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { TrendingUp, Users, Eye, DollarSign } from "lucide-react";

// export function OrganizerDashboardOverview() {
//     const metrics = [
//         {
//             title: "Total Events",
//             value: "5",
//             subtext: "4 published",
//             icon: TrendingUp,
//             color: "text-blue-600",
//             bgColor: "bg-blue-50",
//         },
//         {
//             title: "Total Revenue",
//             value: "$1,171,475",
//             subtext: "from 13,135 tickets",
//             icon: DollarSign,
//             color: "text-green-600",
//             bgColor: "bg-green-50",
//         },
//         {
//             title: "Total Views",
//             value: "43,710",
//             subtext: "across all events",
//             icon: Eye,
//             color: "text-purple-600",
//             bgColor: "bg-purple-50",
//         },
//         {
//             title: "Avg Engagement",
//             value: "61.2%",
//             subtext: "user interaction rate",
//             icon: Users,
//             color: "text-orange-600",
//             bgColor: "bg-orange-50",
//         },
//     ];

//     return (
//         <div className="w-full mb-10">
//             <div className="flex justify-between items-center mb-6">
//                 <div>
//                     <div className="flex items-center gap-2">
//                         <SidebarTrigger className="md:hidden block" />
//                         <h1 className="font-bold text-[#0D121C] text-2xl">Dashboard</h1>
//                     </div>
//                     <p className="text-[#64748B] mt-1">Monitor your events performance and key metrics</p>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {metrics.map((metric) => (
//                     <Card key={metric.title} className="shadow-sm border border-gray-200 p-0">
//                         <CardContent className="p-5">
//                             <div className="flex justify-between items-start">
//                                 <div>
//                                     <p className="text-[#64748B] text-sm mb-1">{metric.title}</p>
//                                     <p className="text-2xl font-bold text-[#0D121C]">{metric.value}</p>
//                                     <p className="text-[#64748B] text-xs mt-2">{metric.subtext}</p>
//                                 </div>
//                                 <div className={`${metric.bgColor} ${metric.color} p-3 rounded-lg`}>
//                                     <metric.icon className="w-6 h-6" />
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     );
// }

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Calendar, DollarSign, Eye, Users, TrendingUp, TrendingDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useGetOrganizerDashboardStatsQuery } from "@/redux/features/organizerdash/organizerDashApi";

export function OrganizerDashboardOverview() {
    const { data: statsData, isLoading, isError } = useGetOrganizerDashboardStatsQuery(undefined);

    const stats = statsData?.data;

    // Show loading skeletons
    if (isLoading) {
        return (
            <div className="w-full mb-10">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="md:hidden block" />
                            <Skeleton className="h-8 w-48" />
                        </div>
                        <Skeleton className="h-4 w-64 mt-1" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="shadow-sm border border-gray-200 p-0">
                            <CardContent className="p-5">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-8 w-32" />
                                        <Skeleton className="h-3 w-40" />
                                    </div>
                                    <Skeleton className="h-12 w-12 rounded-lg" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    // Show error state
    if (isError) {
        return (
            <div className="w-full mb-10">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="md:hidden block" />
                            <h1 className="font-bold text-[#0D121C] text-2xl">Dashboard</h1>
                        </div>
                        <p className="text-[#64748B] mt-1">Monitor your events performance and key metrics</p>
                    </div>
                </div>

                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Failed to load dashboard statistics. Please try again later.</AlertDescription>
                </Alert>

                {/* Fallback static metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { title: "Total Events", value: "0", subtext: "0 active", icon: Calendar },
                        { title: "Total Revenue", value: "$0", subtext: "All time revenue", icon: DollarSign },
                        { title: "Total Views", value: "0", subtext: "Event page views", icon: Eye },
                        { title: "Avg Engagement", value: "0%", subtext: "Interaction rate", icon: Users },
                    ].map((metric) => (
                        <Card key={metric.title} className="shadow-sm border border-gray-200 p-0 opacity-70">
                            <CardContent className="p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-[#64748B] text-sm mb-1">{metric.title}</p>
                                        <p className="text-2xl font-bold text-[#0D121C]">{metric.value}</p>
                                        <p className="text-[#64748B] text-xs mt-2">{metric.subtext}</p>
                                    </div>
                                    <div className="bg-gray-100 text-gray-400 p-3 rounded-lg">
                                        <metric.icon className="w-6 h-6" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    const metrics = [
        {
            title: "Total Events",
            value: stats?.totalEvents?.toString() || "0",
            subtext: `${stats?.activeEvents || 0} active`,
            icon: Calendar,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            growth: stats?.eventGrowth,
        },
        {
            title: "Total Revenue",
            value: `$${(stats?.totalRevenue || 0).toLocaleString()}`,
            subtext: "All time revenue",
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-50",
            growth: stats?.revenueGrowth,
        },
        {
            title: "Total Views",
            value: (stats?.totalViews || 0).toLocaleString(),
            subtext: "Event page views",
            icon: Eye,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            title: "Avg Engagement",
            value: `${(stats?.avgEngagement || 0).toFixed(1)}%`,
            subtext: "Interaction rate",
            icon: Users,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
    ];

    return (
        <div className="w-full mb-10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="md:hidden block" />
                        <h1 className="font-bold text-[#0D121C] text-2xl">Dashboard</h1>
                    </div>
                    <p className="text-[#64748B] mt-1">Monitor your events performance and key metrics</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => (
                    <Card key={metric.title} className="shadow-sm border border-gray-200 p-0">
                        <CardContent className="p-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-[#64748B] text-sm mb-1">{metric.title}</p>
                                        {metric.growth !== undefined && (
                                            <span className={`flex items-center text-xs ${metric.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                                                {metric.growth >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                                {Math.abs(metric.growth)}%
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-2xl font-bold text-[#0D121C]">{metric.value}</p>
                                    <p className="text-[#64748B] text-xs mt-2">{metric.subtext}</p>
                                </div>
                                <div className={`${metric.bgColor} ${metric.color} p-3 rounded-lg`}>
                                    <metric.icon className="w-6 h-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
