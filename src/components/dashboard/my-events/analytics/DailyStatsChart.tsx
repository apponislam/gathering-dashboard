// "use client";

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const data = [
//     { date: "2025-06-01", revenue: 12000, sales: 150, views: 500 },
//     { date: "2025-06-02", revenue: 13000, sales: 500, views: 3000 },
//     { date: "2025-06-03", revenue: 14000, sales: 250, views: 750 },
//     { date: "2025-06-04", revenue: 15000, sales: 280, views: 900 },
//     { date: "2025-06-05", revenue: 16000, sales: 300, views: 1100 },
//     { date: "2025-06-06", revenue: 5000, sales: 290, views: 1000 },
// ];

// export function DailyStatsChart() {
//     return (
//         <ResponsiveContainer width="100%" height={350}>
//             <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
//                 <XAxis dataKey="date" stroke="#666" style={{ fontSize: "12px" }} />
//                 <YAxis stroke="#666" style={{ fontSize: "12px" }} />
//                 <Tooltip
//                     contentStyle={{
//                         backgroundColor: "#fff",
//                         border: "1px solid #ccc",
//                         borderRadius: "8px",
//                     }}
//                     labelStyle={{ color: "#000" }}
//                 />
//                 <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
//                 <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={{ fill: "#10B981", r: 4 }} name="Revenue ($)" />
//                 <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6", r: 4 }} name="Sales" />
//                 <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} name="Views" />
//             </LineChart>
//         </ResponsiveContainer>
//     );
// }

"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface DailyStat {
    date: string;
    views: number;
    sales: number;
    revenue: number;
}

interface DailyStatsChartProps {
    dailyStats: DailyStat[];
}

export function DailyStatsChart({ dailyStats }: DailyStatsChartProps) {
    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    // Use provided data or empty array
    const data =
        dailyStats.length > 0
            ? dailyStats.map((stat) => ({
                  ...stat,
                  formattedDate: formatDate(stat.date),
              }))
            : [];

    if (data.length === 0) {
        return (
            <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No daily statistics available</p>
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="formattedDate" stroke="#666" style={{ fontSize: "12px" }} />
                <YAxis
                    stroke="#666"
                    style={{ fontSize: "12px" }}
                    tickFormatter={(value) => {
                        if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                        return value.toString();
                    }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#000" }}
                    formatter={(value: number, name: string) => {
                        if (name === "revenue") return [`$${value.toLocaleString()}`, "Revenue"];
                        if (name === "sales") return [value.toLocaleString(), "Sales"];
                        if (name === "views") return [value.toLocaleString(), "Views"];
                        return [value, name];
                    }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={{ fill: "#10B981", r: 4 }} name="Revenue ($)" />
                <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6", r: 4 }} name="Sales" />
                <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} name="Views" />
            </LineChart>
        </ResponsiveContainer>
    );
}
