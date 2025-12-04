"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    { name: "Music", value: 1.0, color: "#4F46E5" },
    { name: "Conference", value: 0.75, color: "#8B5CF6" },
    { name: "Food & Drink", value: 0.5, color: "#A855F7" },
    { name: "Sports", value: 0.25, color: "#D946EF" },
    { name: "Art", value: 0.0, color: "#EC4899" },
];

export function EventsByCategory() {
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
                        {data.map((item, index) => (
                            <div key={index} className="flex flex-col items-center flex-1 h-full">
                                {/* Bar */}
                                <div
                                    className="w-12 rounded-t-lg relative group"
                                    style={{
                                        height: `${item.value * 100}%`,
                                        backgroundColor: item.color,
                                    }}
                                >
                                    {/* Value on hover */}
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.value.toFixed(2)}</div>
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
