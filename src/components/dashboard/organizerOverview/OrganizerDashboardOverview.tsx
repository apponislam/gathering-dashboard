import { Card, CardContent } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TrendingUp, Users, Eye, DollarSign } from "lucide-react";

export function OrganizerDashboardOverview() {
    const metrics = [
        {
            title: "Total Events",
            value: "5",
            subtext: "4 published",
            icon: TrendingUp,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Total Revenue",
            value: "$1,171,475",
            subtext: "from 13,135 tickets",
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Total Views",
            value: "43,710",
            subtext: "across all events",
            icon: Eye,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            title: "Avg Engagement",
            value: "61.2%",
            subtext: "user interaction rate",
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
                                    <p className="text-[#64748B] text-sm mb-1">{metric.title}</p>
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
