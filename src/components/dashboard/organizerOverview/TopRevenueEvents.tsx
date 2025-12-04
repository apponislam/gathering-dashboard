"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Tech Conference 2025", revenue: 600000 },
    { name: "Summer Music Festival", revenue: 450000 },
    { name: "Art Exhibition: Modern", revenue: 300000 },
];

export function TopRevenueEvents() {
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
                            <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
