import { Users, Calendar, FilePlus, AlertCircle } from "lucide-react";

export default function DashboardOverview() {
    const stats = [
        {
            title: "Total Users",
            value: "12,847",
            change: "+12.5%",
            isPositive: true,
            icon: Users,
            color: "bg-blue-500",
        },
        {
            title: "Active Events",
            value: "1,234",
            change: "+8.3%",
            isPositive: true,
            icon: Calendar,
            color: "bg-green-500",
        },
        {
            title: "Events Created",
            value: "567",
            change: "-5%",
            isPositive: false,
            icon: FilePlus,
            color: "bg-purple-500",
        },
        {
            title: "Pending Reviews",
            value: "23",
            change: "+100%",
            isPositive: true,
            icon: AlertCircle,
            color: "bg-amber-500",
        },
    ];

    return (
        <div className="w-full mb-10">
            {/* Dashboard Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600 mt-2">Welcome back! Here&apos;s what&apos;s happening with Gathering today</p>
            </div>

            {/* Stats Cards Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="w-full bg-white rounded-xl shadow-sm border border-[#CFD4E8] p-6 ">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg text-white shrink-0 ml-4`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className={`text-sm font-medium ${stat.isPositive ? "text-green-600" : "text-red-600"}`}>{stat.change}</span>
                            <span className="text-gray-500 text-sm ml-2">from last month</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
