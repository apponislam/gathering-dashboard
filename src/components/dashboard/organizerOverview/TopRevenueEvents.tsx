// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//     { name: "Tech Conference 2025", revenue: 600000 },
//     { name: "Summer Music Festival", revenue: 450000 },
//     { name: "Art Exhibition: Modern", revenue: 300000 },
// ];

// export function TopRevenueEvents() {
//     return (
//         <Card className="shadow-sm border border-gray-200">
//             <CardHeader className="pb-4">
//                 <CardTitle className="text-lg font-bold text-[#0D121C]">Top Revenue Events</CardTitle>
//                 <p className="text-sm text-[#64748B] mt-1">Events generating the most revenue</p>
//             </CardHeader>
//             <CardContent>
//                 <div className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
//                             <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
//                             <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
//                             <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
//                             <Tooltip
//                                 formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
//                                 labelFormatter={(label) => `Event: ${label}`}
//                                 contentStyle={{
//                                     backgroundColor: "white",
//                                     border: "1px solid #E2E8F0",
//                                     borderRadius: "6px",
//                                     fontSize: "12px",
//                                 }}
//                             />
//                             <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={40} />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetTopRevenueEventsQuery } from "@/redux/features/organizerdash/organizerDashApi";

export function TopRevenueEvents() {
    const { data: apiData, isLoading, isError } = useGetTopRevenueEventsQuery(undefined);

    // Transform API data to match your chart format
    const data =
        apiData?.data?.map((event: any) => ({
            name: event.title,
            revenue: event.totalRevenue || 0,
        })) || [];

    // Show loading skeleton
    if (isLoading) {
        return (
            <Card className="shadow-sm border border-gray-200">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#0D121C]">
                        <Skeleton className="h-6 w-48" />
                    </CardTitle>
                    {/* Remove the <p> wrapper here */}
                    <Skeleton className="h-4 w-64 mt-1" />
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <Skeleton className="h-full w-full" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Show error state or empty state
    if (isError || data.length === 0) {
        const errorData = [
            { name: "No data available", revenue: 0 },
            { name: "No data available", revenue: 0 },
            { name: "No data available", revenue: 0 },
        ];

        return (
            <Card className="shadow-sm border border-gray-200">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#0D121C]">Top Revenue Events</CardTitle>
                    <p className="text-sm text-[#64748B] mt-1">Events generating the most revenue</p>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={errorData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
                                    labelFormatter={(label) => `Event: ${label}`}
                                    contentStyle={{
                                        backgroundColor: "white",
                                        border: "1px solid #E2E8F0",
                                        borderRadius: "6px",
                                        fontSize: "12px",
                                    }}
                                />
                                <Bar dataKey="revenue" fill="#E2E8F0" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-[#0D121C]">Top Revenue Events</CardTitle>
                <p className="text-sm text-[#64748B] mt-1">Events generating the most revenue</p>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis
                                dataKey="name"
                                angle={-45}
                                textAnchor="end"
                                height={80}
                                tick={{ fontSize: 12 }}
                                tickFormatter={(value) => {
                                    // Truncate long event names
                                    if (value.length > 15) {
                                        return value.substring(0, 15) + "...";
                                    }
                                    return value;
                                }}
                            />
                            <YAxis
                                tickFormatter={(value) => {
                                    if (value >= 1000) {
                                        return `$${(value / 1000).toFixed(0)}k`;
                                    }
                                    return `$${value}`;
                                }}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                                formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
                                labelFormatter={(label) => `Event: ${label}`}
                                contentStyle={{
                                    backgroundColor: "white",
                                    border: "1px solid #E2E8F0",
                                    borderRadius: "6px",
                                    fontSize: "12px",
                                }}
                            />
                            <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
