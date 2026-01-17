// "use client";

// import { Button } from "@/components/ui/button";
// import { ArrowLeft, MapPin, Clock, Video, Calendar } from "lucide-react";
// import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// export default function EventHeaderAndDetails() {
//     return (
//         <div className="border-b border-border pb-8">
//             {/* Header Section */}
//             <div className="flex items-center justify-between mb-6">
//                 <h1 className="text-text-balance font-bold text-2xl">Tech Conference 2025</h1>
//                 <Link href="/my-events">
//                     <Button variant="outline" size="sm" className="gap-2 border-[#0000001A]">
//                         <ArrowLeft className="w-4 h-4" />
//                         Back
//                     </Button>
//                 </Link>
//             </div>

//             <div className="flex items-center gap-4 mb-4 flex-wrap">
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <MapPin className="w-4 h-4" />
//                     Convention Center, San Francisco
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <Clock className="w-4 h-4" />
//                     09:00
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <Calendar className="w-4 h-4" />
//                     November 15, 2025
//                 </div>
//                 <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Not Started</span>
//             </div>

//             <div className="mt-4 mb-6 flex items-center gap-2">
//                 <div className="flex items-center gap-2 text-sm">
//                     <Video className="w-4 h-4" />
//                     <span>Live Stream</span>
//                 </div>
//             </div>

//             {/* Details Input Section */}
//             <div className="space-y-6">
//                 <div>
//                     <label className="text-sm font-semibold text-foreground mb-2 block">Title</label>
//                     <Input defaultValue="Tech Conference 2025 - Innovation & Development" className="bg-muted rounded-lg p-4 min-h-12 text-foreground" />
//                 </div>

//                 <div>
//                     <label className="text-sm font-semibold text-foreground mb-2 block">Description</label>
//                     <Textarea defaultValue="Join industry leaders and innovators for a full day of cutting-edge talks, workshops, and networking. Discover the latest trends in web development, AI, and cloud technologies." className="bg-muted rounded-lg p-4 min-h-32 text-foreground resize-none" rows={5} />
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Video, Calendar } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetEventByIdQuery } from "@/redux/features/events/eventsApi";

export default function EventHeaderAndDetails() {
    const { id: eventId } = useParams();

    const { data, isLoading, isError } = useGetEventByIdQuery(eventId as string, {
        skip: !eventId,
    });

    console.log("Event details API response:", data);

    const eventData = data?.data;

    // Format status text
    const getStatusText = (status?: string) => {
        if (!status) return "Not Started";
        switch (status.toLowerCase()) {
            case "pending":
                return "Pending";
            case "approved":
                return "Approved";
            case "rejected":
                return "Rejected";
            case "archived":
                return "Archived";
            case "active":
                return "Active";
            default:
                return status.charAt(0).toUpperCase() + status.slice(1);
        }
    };

    // Format status badge color
    const getStatusColor = (status?: string) => {
        switch (status?.toLowerCase()) {
            case "approved":
            case "active":
                return "bg-blue-100 text-blue-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "rejected":
            case "cancelled":
                return "bg-red-100 text-red-800";
            case "archived":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="border-b border-border pb-8">
                <div className="flex items-center justify-between mb-6">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-10 w-32" />
                </div>

                <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-6 w-32 ml-auto" />
                </div>

                <div className="mt-4 mb-6">
                    <Skeleton className="h-6 w-32" />
                </div>

                <div className="space-y-6">
                    <div>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError || !eventData) {
        return (
            <div className="border-b border-border pb-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-red-600">Error Loading Event</h1>
                    <Link href="/my-events">
                        <Button variant="outline" size="sm" className="gap-2 border-[#0000001A]">
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Button>
                    </Link>
                </div>
                <p className="text-muted-foreground">Failed to load event details. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="border-b border-border pb-8">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{eventData.title || "Event Details"}</h1>
                <Link href="/my-events">
                    <Button variant="outline" size="sm" className="gap-2 border-[#0000001A]">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {eventData.address || "Convention Center, San Francisco"}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {eventData.startTime || "09:00"}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {eventData.startDate
                        ? new Date(eventData.startDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                          })
                        : "November 15, 2025"}
                </div>
                <span className={`ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(eventData.status)}`}>{getStatusText(eventData.status)}</span>
            </div>

            <div className="mt-4 mb-6 flex items-center gap-2">
                {eventData.hasLiveStream && (
                    <div className="flex items-center gap-2 text-sm">
                        <Video className="w-4 h-4" />
                        <span>{eventData.isStreamingActive ? "Live Stream • Live Now" : "Live Stream Available"}</span>
                    </div>
                )}
            </div>

            {/* Details Input Section - Read Only Display */}
            <div className="space-y-6">
                <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Title</label>
                    <Input value={eventData.title || ""} readOnly className="bg-muted rounded-lg p-4 min-h-12 text-foreground cursor-default" />
                </div>

                <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Description</label>
                    <Textarea value={eventData.description || ""} readOnly className="bg-muted rounded-lg p-4 min-h-32 text-foreground resize-none cursor-default" rows={5} />
                </div>
            </div>
        </div>
    );
}
