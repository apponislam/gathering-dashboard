// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const data = [
//     { name: "Music", value: 1.0, color: "#4F46E5" },
//     { name: "Conference", value: 0.75, color: "#8B5CF6" },
//     { name: "Food & Drink", value: 0.5, color: "#A855F7" },
//     { name: "Sports", value: 0.25, color: "#D946EF" },
//     { name: "Art", value: 0.1, color: "#EC4899" },
// ];

// export function EventsByCategory() {
//     return (
//         <Card className="shadow-sm border border-gray-200">
//             <CardHeader className="pb-4">
//                 <CardTitle className="text-lg font-bold text-[#0D121C]">Events by Category</CardTitle>
//                 <p className="text-sm text-[#64748B] mt-1">Distribution of event types</p>
//             </CardHeader>
//             <CardContent>
//                 <div className="h-64 relative">
//                     {/* Y-axis labels and grid lines */}
//                     <div className="absolute left-0 top-0 h-full flex flex-col justify-between">
//                         {[1, 0.75, 0.5, 0.25, 0].map((value, index) => (
//                             <div key={index} className="flex items-start">
//                                 <span className="text-xs text-[#64748B] w-6 text-right mr-2">{value}</span>
//                                 <div className="flex-1 border-t border-gray-200"></div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Bars - CORRECTED */}
//                     <div className="ml-10 h-full flex items-end space-x-4">
//                         {data.map((item, index) => (
//                             <div key={index} className="flex flex-col items-center justify-end flex-1 h-full">
//                                 {/* Bar container */}
//                                 <div className="w-12 flex flex-col justify-end h-full">
//                                     {/* Bar */}
//                                     <div
//                                         className="w-12 rounded-t-lg relative group"
//                                         style={{
//                                             height: `${item.value * 100}%`,
//                                             backgroundColor: item.color,
//                                         }}
//                                     >
//                                         {/* Value on hover */}
//                                         <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.value.toFixed(2)}</div>
//                                     </div>
//                                 </div>

//                                 {/* Category label */}
//                                 <span className="text-xs text-[#64748B] mt-2 text-center leading-tight">{item.name}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetOrganizerEventStatsQuery } from "@/redux/features/organizerdash/organizerDashApi";

// Define colors for categories - keep your original colors
const categoryColors: { [key: string]: string } = {
    music: "#4F46E5",
    technology: "#8B5CF6",
    conference: "#A855F7",
    "food & drink": "#D946EF",
    sports: "#EC4899",
    art: "#F59E0B",
    business: "#10B981",
    education: "#3B82F6",
    health: "#EF4444",
    other: "#64748B", // Default color
};

export function EventsByCategory() {
    const { data: apiData, isLoading, isError } = useGetOrganizerEventStatsQuery(undefined);

    // Transform API data to match your chart format
    const categoryData = apiData?.data?.categoryDistribution || [];

    // Calculate total events for percentages
    const totalEvents = categoryData.reduce((sum: number, item: any) => sum + (item.count || 0), 0);

    // Transform to your chart format
    const data = categoryData.map((item: any) => {
        const percentage = totalEvents > 0 ? item.count / totalEvents : 0;
        const color = categoryColors[item.category?.toLowerCase()] || categoryColors.other;
        const displayName = item.category?.charAt(0).toUpperCase() + item.category?.slice(1) || "Other";

        return {
            name: displayName,
            value: percentage, // Already a decimal between 0-1
            color: color,
            count: item.count,
        };
    });

    // Show loading skeleton
    if (isLoading) {
        return (
            <Card className="shadow-sm border border-gray-200">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#0D121C]">
                        <Skeleton className="h-6 w-48" />
                    </CardTitle>
                    <div className="text-sm text-[#64748B] mt-1">
                        <Skeleton className="h-4 w-64" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-64 relative">
                        {/* Skeleton for y-axis */}
                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between">
                            {[1, 0.75, 0.5, 0.25, 0].map((_, index) => (
                                <div key={index} className="flex items-start">
                                    <Skeleton className="h-3 w-6 mr-2" />
                                    <Skeleton className="flex-1 h-px" />
                                </div>
                            ))}
                        </div>

                        {/* Skeleton for bars */}
                        <div className="ml-10 h-full flex items-end space-x-4">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <div key={index} className="flex flex-col items-center justify-end flex-1 h-full">
                                    <Skeleton className="w-12 h-3/4 rounded-t-lg" />
                                    <Skeleton className="h-3 w-16 mt-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Show empty or error state
    if (isError || data.length === 0) {
        const emptyData = [
            { name: "No data", value: 0, color: "#E5E7EB", count: 0 },
            { name: "No data", value: 0, color: "#E5E7EB", count: 0 },
            { name: "No data", value: 0, color: "#E5E7EB", count: 0 },
            { name: "No data", value: 0, color: "#E5E7EB", count: 0 },
            { name: "No data", value: 0, color: "#E5E7EB", count: 0 },
        ];

        return (
            <Card className="shadow-sm border border-gray-200">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-[#0D121C]">Events by Category</CardTitle>
                    <p className="text-sm text-[#64748B] mt-1">Distribution of event types</p>
                </CardHeader>
                <CardContent>
                    <div className="h-64 relative">
                        {/* Y-axis labels and grid lines */}
                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between">
                            {[1, 0.75, 0.5, 0.25, 0].map((value, index) => (
                                <div key={index} className="flex items-start">
                                    <span className="text-xs text-[#64748B] w-6 text-right mr-2">{value}</span>
                                    <div className="flex-1 border-t border-gray-200"></div>
                                </div>
                            ))}
                        </div>

                        {/* Bars */}
                        <div className="ml-10 h-full flex items-end space-x-4">
                            {emptyData.map((item, index) => (
                                <div key={index} className="flex flex-col items-center justify-end flex-1 h-full">
                                    {/* Bar container */}
                                    <div className="w-12 flex flex-col justify-end h-full">
                                        {/* Bar */}
                                        <div
                                            className="w-12 rounded-t-lg"
                                            style={{
                                                height: `${item.value * 100}%`,
                                                backgroundColor: item.color,
                                            }}
                                        ></div>
                                    </div>
                                    {/* Category label */}
                                    <span className="text-xs text-[#64748B] mt-2 text-center leading-tight">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-[#0D121C]">Events by Category</CardTitle>
                <p className="text-sm text-[#64748B] mt-1">Distribution of event types</p>
            </CardHeader>
            <CardContent>
                <div className="h-64 relative">
                    {/* Y-axis labels and grid lines */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between">
                        {[1, 0.75, 0.5, 0.25, 0].map((value, index) => (
                            <div key={index} className="flex items-start">
                                <span className="text-xs text-[#64748B] w-6 text-right mr-2">{value}</span>
                                <div className="flex-1 border-t border-gray-200"></div>
                            </div>
                        ))}
                    </div>

                    {/* Bars */}
                    <div className="ml-10 h-full flex items-end space-x-4">
                        {data.slice(0, 5).map((item: any, index: any) => (
                            <div key={index} className="flex flex-col items-center justify-end flex-1 h-full">
                                {/* Bar container */}
                                <div className="w-12 flex flex-col justify-end h-full">
                                    {/* Bar */}
                                    <div
                                        className="w-12 rounded-t-lg relative group"
                                        style={{
                                            height: `${item.value * 100}%`,
                                            backgroundColor: item.color,
                                        }}
                                    >
                                        {/* Value on hover */}
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {item.count} event{item.count !== 1 ? "s" : ""} ({item.value.toFixed(1)})
                                        </div>
                                    </div>
                                </div>

                                {/* Category label */}
                                <span className="text-xs text-[#64748B] mt-2 text-center leading-tight">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
