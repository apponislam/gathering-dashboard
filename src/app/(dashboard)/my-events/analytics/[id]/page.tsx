"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Eye, Ticket, DollarSign, TrendingUp } from "lucide-react";
import { DailyStatsChart } from "@/components/dashboard/my-events/analytics/DailyStatsChart";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetEventStatsQuery } from "@/redux/features/organizerdash/organizerDashApi";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventOrganizerPage() {
    const params = useParams();
    const eventId = params.id as string;

    const { data: apiData, isLoading, isError } = useGetEventStatsQuery(eventId);

    const eventData = apiData?.data;

    // Format date
    const formatDate = (dateString: string) => {
        if (!dateString) return "Date not set";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // Show loading skeleton
    if (isLoading) {
        return (
            <div>
                {/* Header Skeleton */}
                <div className="border-b border-gray-200">
                    <div className="mx-auto px-6 py-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-10 h-10 rounded-lg" />
                            <div>
                                <Skeleton className="h-7 w-48 mb-2" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>

                {/* Main Content Skeleton */}
                <div className="mx-auto py-8">
                    {/* Event Title Skeleton */}
                    <Skeleton className="h-10 w-64 mb-6" />

                    {/* Event Details Skeleton */}
                    <div className="flex items-center gap-6 mb-6 border-b border-[#0000001A] pb-6">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-6 w-20" />
                    </div>

                    {/* Metrics Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="border border-[#0000001A] bg-white rounded-[14px] p-6">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-8 w-32" />
                                    <Skeleton className="h-3 w-40" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-[#0000001A] mb-6"></div>

                    {/* Overview Section Skeleton */}
                    <div className="text-left mb-8">
                        <Skeleton className="h-10 w-32 mx-auto" />
                    </div>

                    {/* Daily Statistics Skeleton */}
                    <div className="border border-[#0000001A] bg-white rounded-[14px] p-6">
                        <div className="space-y-4">
                            <div>
                                <Skeleton className="h-6 w-48 mb-2" />
                                <Skeleton className="h-4 w-64" />
                            </div>
                            <Skeleton className="h-80 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Show error state
    if (isError || !eventData) {
        return (
            <div>
                <div className="border-b border-gray-200">
                    <div className="mx-auto px-6 py-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Event Not Found</h1>
                                <p className="text-sm text-gray-500">Could not load event data</p>
                            </div>
                        </div>
                        <Link href="/my-events">
                            <Button variant="ghost" className="gap-2 text-[#0A0A0A] border border-[#0000001A]">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Events
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="mx-auto py-8 text-center">
                    <div className="border border-[#0000001A] bg-white rounded-[14px] p-12">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Event data unavailable</h3>
                        <p className="text-sm text-gray-600 mb-4">Unable to load statistics for this event.</p>
                        <Link href="/my-events">
                            <Button>Return to Events List</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="border-b border-gray-200">
                <div className=" mx-auto px-6 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Event Organizer</h1>
                            <p className="text-sm text-gray-500">Manage your events with ease</p>
                        </div>
                    </div>
                    <Link href="/my-events">
                        <Button variant="ghost" className="gap-2 text-[#0A0A0A] border border-[#0000001A]">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Events
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto py-8">
                {/* Event Card with Blue Border */}
                <div className="">
                    {/* Event Title */}
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">{eventData.title || "Untitled Event"}</h2>

                    {/* Event Details */}
                    <div className="flex items-center gap-6 text-gray-600 mb-6 border-b border-[#0000001A] pb-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{formatDate(eventData.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{eventData.address || "Location not specified"}</span>
                        </div>
                        <Badge className="bg-gray-900 text-white hover:bg-gray-800 capitalize">{eventData.category || "Event"}</Badge>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                        {/* Total Views */}
                        <div className="border border-[#0000001A] bg-white rounded-[14px] p-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Eye className="w-4 h-4" />
                                    <span className="text-sm font-medium">Total Views</span>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">{eventData.totalViews?.toLocaleString() || 0}</p>
                            </div>
                        </div>

                        {/* Tickets Sold */}
                        <div className="border border-[#0000001A] bg-white rounded-[14px] p-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Ticket className="w-4 h-4" />
                                    <span className="text-sm font-medium">Tickets Sold</span>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">{eventData.ticketsSold?.toLocaleString() || 0}</p>
                                <p className="text-xs text-gray-500">of {eventData.capacity?.toLocaleString() || 0} capacity</p>
                            </div>
                        </div>

                        {/* Total Revenue */}
                        <div className="border border-[#0000001A] bg-white rounded-[14px] p-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="text-sm font-medium">Total Revenue</span>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">${(eventData.totalRevenue || 0).toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Avg: ${(eventData.averageTicketPrice || 0).toFixed(2)}</p>
                            </div>
                        </div>

                        {/* Conversion Rate */}
                        <div className="border border-[#0000001A] bg-white rounded-[14px] p-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <TrendingUp className="w-4 h-4" />
                                    <span className="text-sm font-medium">Conversion Rate</span>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">{(eventData.conversionRate || 0).toFixed(2)}%</p>
                                <p className="text-xs text-gray-500">Views to sales</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-[#0000001A]  mb-6"></div>

                    {/* Overview Section */}
                    <div className="text-left mb-8">
                        <div className="inline-flex items-center justify-center px-4 py-2 border-4 border-[#ECECF0] rounded-full bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                            <h3 className="text-sm font-medium text-gray-900">Overview</h3>
                        </div>
                    </div>

                    {/* Daily Statistics */}
                    <div className="border border-[#0000001A] bg-white rounded-[14px] p-6">
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-1">Daily Statistics</h4>
                                <p className="text-sm text-gray-600 mb-6">Track daily views, sales, and revenue</p>
                            </div>
                            <DailyStatsChart dailyStats={eventData.dailyStats || []} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
