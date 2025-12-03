"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const barChartData = [
    { name: "Fri", events: 1600 },
    { name: "Thu", events: 2300 },
    { name: "Wed", events: 250 },
    { name: "Tue", events: 1500 },
    { name: "Mon", events: 100 },
    { name: "Sun", events: 100 },
    { name: "Sat", events: 100 },
];

export function EventsChart() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Events Created This Week</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={barChartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                        <XAxis type="number" stroke="var(--muted-foreground)" axisLine={false} tickLine={false} />
                        <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--card)",
                                border: "1px solid var(--border)",
                                borderRadius: "6px",
                            }}
                            labelStyle={{ color: "var(--foreground)" }}
                        />
                        <Bar
                            dataKey="events"
                            fill="#1AA367"
                            radius={[0, 4, 4, 0]}
                            barSize={24} // Controls the width of each bar
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
