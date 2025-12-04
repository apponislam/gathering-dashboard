"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Chart data
const viewsData = [
    { name: "Mon", value: 180 },
    { name: "Tue", value: 220 },
    { name: "Wed", value: 250 },
    { name: "Thu", value: 200 },
    { name: "Fri", value: 280 },
    { name: "Sat", value: 260 },
    { name: "Sun", value: 310 },
];

const engagementData = [
    { name: "Mon", value: 65 },
    { name: "Tue", value: 70 },
    { name: "Wed", value: 75 },
    { name: "Thu", value: 72 },
    { name: "Fri", value: 78 },
    { name: "Sat", value: 80 },
    { name: "Sun", value: 75 },
];

const salesData = [
    { day: "Mon", value: 50 },
    { day: "Tue", value: 65 },
    { day: "Wed", value: 75 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 45 },
    { day: "Sat", value: 70 },
    { day: "Sun", value: 85 },
];

export default function EventPage() {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold">Tech Conference 2024</h1>
            </div>
            <p className="text-sm text-[#4D5999]">Status: Pending</p>

            {/* Event Details */}
            <div className="w-full mb-4">
                {/* Header */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Event Details</h2>
                </div>

                {/* Content */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                    <div className="pb-3 border-b border-gray-300">
                        <p className="text-sm text-muted-foreground mb-2">Date</p>
                        <p className="font-medium text-foreground">July 15, 2024</p>
                    </div>

                    <div className="pb-3 border-b border-gray-300">
                        <p className="text-sm text-muted-foreground mb-2">Location</p>
                        <p className="font-medium text-foreground">Convention Center, Cityville</p>
                    </div>

                    <div className="pb-3 border-b border-gray-300">
                        <p className="text-sm text-muted-foreground mb-2">Description</p>
                        <p className="text-foreground text-sm">A premier tech summit connecting industry leaders and innovators.</p>
                    </div>

                    <div className="pb-3 border-b border-gray-300">
                        <p className="text-sm text-muted-foreground mb-2">Organizer</p>
                        <p className="font-medium text-foreground">Tech Events Inc.</p>
                    </div>

                    <div className="pb-3 border-b border-gray-300">
                        <p className="text-sm text-muted-foreground mb-2">Capacity</p>
                        <p className="font-medium text-foreground">1000</p>
                    </div>

                    <div className="pb-3 border-b border-gray-300">
                        <p className="text-sm text-muted-foreground mb-2">Tickets Sold</p>
                        <p className="font-medium text-foreground">500</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="w-full mb-4">
                {/* Header */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Actions</h2>
                </div>

                {/* Content */}
                <div className="flex gap-3">
                    <button className="bg-[#1238ED] rounded-xl hover:bg-blue-700 text-white font-medium py-2 px-4">Approve</button>
                    <button className="border border-[#E8E8F2]  rounded-xl font-medium py-2 px-4  hover:bg-[#E8E8F2]">Reject</button>
                </div>
            </div>

            {/* Performance Analytics */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Performance Analytics</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Views Card */}
                    <Card className="border border-[#CFD4E8]">
                        <CardHeader>
                            <CardTitle className="text-base">Views</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <p className="text-3xl font-bold">1500</p>
                                <p className="text-sm text-green-600 mt-1">Last 7 Days +10%</p>
                            </div>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={viewsData}>
                                    {/* <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /> */}
                                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                                    <YAxis tickLine={false} axisLine={false} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="value" stroke="#4D5999" dot={false} strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Engagement Card */}
                    <Card className="border border-[#CFD4E8]">
                        <CardHeader>
                            <CardTitle className="text-base">Engagement</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <p className="text-3xl font-bold">75%</p>
                                <p className="text-sm text-green-600 mt-1">Last 7 Days +5%</p>
                            </div>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={engagementData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                                    <YAxis tickLine={false} axisLine={false} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#E8E8F2" barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Sales Card */}
                <div className="border border-[#CFD4E8] bg-white rounded-md p-4 w-full">
                    {/* Header */}
                    <div className="mb-4">
                        <h2 className="text-base font-semibold">Sales</h2>
                    </div>

                    {/* Total Sales */}
                    <div className="mb-6">
                        <p className="text-3xl font-bold">500</p>
                        <p className="text-sm text-green-600 mt-1">Last 7 Days +15%</p>
                    </div>

                    {/* Sales Data Bars */}
                    <div className="space-y-3">
                        {salesData.map((data) => (
                            <div key={data.day} className="flex items-center gap-3">
                                <span className="w-12 text-sm font-medium text-gray-500">{data.day}</span>
                                <div className="flex-1 bg-gray-200 rounded h-6 overflow-hidden">
                                    <div className="bg-[#E8E8F2] h-full" style={{ width: `${data.value}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
