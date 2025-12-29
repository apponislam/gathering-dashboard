// "use client";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Calendar, MapPin, Eye, TrendingUp, Radio } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";
// import { EditEventModal } from "./EditEvent";
// import Link from "next/link";
// import { getImageUrl } from "@/utils/imageUrl";

// interface Event {
//     id: string;
//     title: string;
//     category: string;
//     description: string;
//     date: string;
//     time: string;
//     location: string;
//     sold: number;
//     total: number;
//     revenue: number;
//     views: number;
//     engagement: number;
//     image: string;
//     status: string;
// }

// export default function EventCard({ event }: { event: Event }) {
//     const [editModalOpen, setEditModalOpen] = useState(false);
//     const soldPercentage = event.total > 0 ? Math.round((event.sold / event.total) * 100) : 0;

//     console.log(event);

//     // Get the correct image URL using your utility
//     const imageUrl = getImageUrl(event.image);

//     // Determine badge color based on status
//     const getBadgeColor = () => {
//         switch (event.status.toLowerCase()) {
//             case "published":
//             case "approved":
//                 return "bg-[#00C950] hover:bg-green-700";
//             case "draft":
//             case "pending":
//                 return "bg-yellow-500 hover:bg-yellow-600";
//             case "archived":
//                 return "bg-gray-500 hover:bg-gray-600";
//             case "completed":
//                 return "bg-blue-500 hover:bg-blue-600";
//             case "rejected":
//             case "cancelled":
//                 return "bg-red-500 hover:bg-red-600";
//             default:
//                 return "bg-gray-500 hover:bg-gray-600";
//         }
//     };

//     // Format status text for display
//     const getStatusText = (status: string) => {
//         switch (status.toLowerCase()) {
//             case "approved":
//                 return "Published";
//             case "pending":
//                 return "Draft";
//             default:
//                 return status.charAt(0).toUpperCase() + status.slice(1);
//         }
//     };

//     return (
//         <Card className="overflow-hidden bg-card border-border hover:shadow-lg transition-shadow p-0">
//             {/* Event Image */}
//             <div className="relative h-48 w-full overflow-hidden bg-muted">
//                 <Image
//                     src={imageUrl || "/eventpicture.png"}
//                     alt={event.title}
//                     fill
//                     className="object-cover"
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     onError={(e) => {
//                         // Fallback if image fails to load
//                         const target = e.target as HTMLImageElement;
//                         target.src = "/eventpicture.png";
//                         target.onerror = null; // Prevent infinite loop
//                     }}
//                 />
//                 <div className="absolute top-3 right-3">
//                     <Badge className={`${getBadgeColor()} text-white`}>{getStatusText(event.status)}</Badge>
//                 </div>
//             </div>

//             {/* Content */}
//             <div className="">
//                 {/* Title and Category */}
//                 <div className="mb-3 p-4 md:p-6 pt-0!">
//                     <h3 className="text-lg font-semibold text-foreground mb-1">{event.title}</h3>
//                     <Badge variant="outline" className="text-xs">
//                         {event.category}
//                     </Badge>
//                 </div>

//                 {/* Description */}
//                 <p className="text-sm text-muted-foreground mb-4 line-clamp-2 px-4 md:px-6">{event.description}</p>

//                 {/* Date and Location */}
//                 <div className="space-y-2 mb-4 text-sm text-muted-foreground px-4 md:px-6">
//                     <div className="flex items-center gap-2">
//                         <Calendar className="w-4 h-4" />
//                         <span>
//                             {event.date} at {event.time}
//                         </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <MapPin className="w-4 h-4" />
//                         <span>{event.location}</span>
//                     </div>
//                 </div>

//                 {/* Stats Grid - USING REAL DATA */}
//                 <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-border px-4 md:px-6">
//                     {/* Sold */}
//                     <div>
//                         <div className="text-xs text-muted-foreground mb-1">Sold</div>
//                         <div className="text-sm font-semibold text-foreground">
//                             {event.sold} / {event.total}
//                             <span className="text-xs font-normal ml-1">({soldPercentage}%)</span>
//                         </div>
//                     </div>

//                     {/* Revenue */}
//                     <div>
//                         <div className="text-xs text-muted-foreground mb-1">Revenue</div>
//                         <div className="text-sm font-semibold text-foreground">${event.revenue.toLocaleString()}</div>
//                     </div>

//                     {/* Views */}
//                     <div>
//                         <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
//                             <Eye className="w-3 h-3" />
//                             Views
//                         </div>
//                         <div className="text-sm font-semibold text-foreground">{event.views.toLocaleString()}</div>
//                     </div>

//                     {/* Engagement */}
//                     <div>
//                         <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
//                             <TrendingUp className="w-3 h-3" />
//                             Engagement
//                         </div>
//                         <div className="text-sm font-semibold text-foreground">{event.engagement}%</div>
//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-2 px-4 md:px-6 pb-4 md:pb-6">
//                     <Button onClick={() => setEditModalOpen(true)} variant="outline" size="sm" className="flex-1 text-foreground border-border hover:bg-muted bg-transparent py-2 h-auto cursor-pointer">
//                         Edit
//                     </Button>
//                     <Link href={`/my-events/analytics/${event.id}`} className="flex-1">
//                         <Button variant="secondary" size="sm" className="w-full bg-foreground text-background hover:bg-foreground/90 py-2 h-full cursor-pointer">
//                             Analytics
//                         </Button>
//                     </Link>
//                     <Link href={`/my-events/go-live/${event.id}`} className="flex-1">
//                         <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 py-2 h-full cursor-pointer">
//                             <Radio />
//                             Go Live
//                         </Button>
//                     </Link>
//                 </div>
//                 <EditEventModal open={editModalOpen} onOpenChange={setEditModalOpen}  />
//             </div>
//         </Card>
//     );
// }

"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Eye, TrendingUp, Radio } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { EditEventModal } from "./EditEvent";
import Link from "next/link";
import { getImageUrl } from "@/utils/imageUrl";
import { EVENT_STATUS } from "@/redux/features/events/eventsApi";

interface EventData {
    _id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    visibility: "public" | "private";
    startDate: string;
    startTime: string;
    locationType: "physical" | "virtual" | "hybrid";
    address: string;
    capacity: number;
    ticketPrice: number;
    ticketsSold: number;
    views: number;
    favorites: number;
    status: string;
    images: string[];
    location?: {
        type: string;
        coordinates: number[];
    };
}

export default function EventCard({ event }: { event: EventData }) {
    const [editModalOpen, setEditModalOpen] = useState(false);

    console.log("EventCard - Raw API Data:", event);

    // Transform data for display - SAME LOGIC AS BEFORE
    const displayData = useMemo(() => {
        // Format date from "2026-12-25" to "8/22/2025" format
        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
            });
        };

        // Calculate revenue
        const revenue = event.ticketsSold * event.ticketPrice;

        // Calculate engagement
        const engagement = event.views > 0 ? Math.round((event.favorites / event.views) * 100) : 0;

        // Map status for UI
        let displayStatus = event.status;
        if (event.status === EVENT_STATUS.APPROVED) {
            displayStatus = "published";
        } else if (event.status === EVENT_STATUS.PENDING) {
            displayStatus = "draft";
        }

        // Format category
        const category = event.category ? event.category.charAt(0).toUpperCase() + event.category.slice(1) : "Other";

        return {
            id: event._id,
            title: event.title,
            category: category,
            description: event.description,
            date: formatDate(event.startDate),
            time: event.startTime,
            location: event.address,
            sold: event.ticketsSold,
            total: event.capacity,
            revenue: revenue,
            views: event.views,
            engagement: engagement,
            image: event.images?.[0] || "",
            status: displayStatus,
            soldPercentage: event.capacity > 0 ? Math.round((event.ticketsSold / event.capacity) * 100) : 0,
        };
    }, [event]);

    // Get the correct image URL using your utility
    const imageUrl = getImageUrl(displayData.image);

    // Determine badge color based on status
    const getBadgeColor = () => {
        switch (displayData.status.toLowerCase()) {
            case "published":
            case "approved":
                return "bg-[#00C950] hover:bg-green-700";
            case "draft":
            case "pending":
                return "bg-yellow-500 hover:bg-yellow-600";
            case "archived":
                return "bg-gray-500 hover:bg-gray-600";
            case "completed":
                return "bg-blue-500 hover:bg-blue-600";
            case "rejected":
            case "cancelled":
                return "bg-red-500 hover:bg-red-600";
            default:
                return "bg-gray-500 hover:bg-gray-600";
        }
    };

    // Format status text for display
    const getStatusText = (status: string) => {
        switch (status.toLowerCase()) {
            case "approved":
                return "Published";
            case "pending":
                return "Draft";
            default:
                return status.charAt(0).toUpperCase() + status.slice(1);
        }
    };

    return (
        <Card className="overflow-hidden bg-card border-border hover:shadow-lg transition-shadow p-0">
            {/* Event Image */}
            <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                    src={imageUrl || "/eventpicture.png"}
                    alt={displayData.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = "/eventpicture.png";
                        target.onerror = null; // Prevent infinite loop
                    }}
                />
                <div className="absolute top-3 right-3">
                    <Badge className={`${getBadgeColor()} text-white`}>{getStatusText(displayData.status)}</Badge>
                </div>
            </div>

            {/* Content */}
            <div className="">
                {/* Title and Category */}
                <div className="mb-3 p-4 md:p-6 pt-0!">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{displayData.title}</h3>
                    <Badge variant="outline" className="text-xs">
                        {displayData.category}
                    </Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 px-4 md:px-6">{displayData.description}</p>

                {/* Date and Location */}
                <div className="space-y-2 mb-4 text-sm text-muted-foreground px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                            {displayData.date} at {displayData.time}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{displayData.location}</span>
                    </div>
                </div>

                {/* Stats Grid - USING REAL DATA */}
                <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-border px-4 md:px-6">
                    {/* Sold */}
                    <div>
                        <div className="text-xs text-muted-foreground mb-1">Sold</div>
                        <div className="text-sm font-semibold text-foreground">
                            {displayData.sold} / {displayData.total}
                            <span className="text-xs font-normal ml-1">({displayData.soldPercentage}%)</span>
                        </div>
                    </div>

                    {/* Revenue */}
                    <div>
                        <div className="text-xs text-muted-foreground mb-1">Revenue</div>
                        <div className="text-sm font-semibold text-foreground">${displayData.revenue.toLocaleString()}</div>
                    </div>

                    {/* Views */}
                    <div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                            <Eye className="w-3 h-3" />
                            Views
                        </div>
                        <div className="text-sm font-semibold text-foreground">{displayData.views.toLocaleString()}</div>
                    </div>

                    {/* Engagement */}
                    <div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                            <TrendingUp className="w-3 h-3" />
                            Engagement
                        </div>
                        <div className="text-sm font-semibold text-foreground">{displayData.engagement}%</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 px-4 md:px-6 pb-4 md:pb-6">
                    <Button onClick={() => setEditModalOpen(true)} variant="outline" size="sm" className="flex-1 text-foreground border-border hover:bg-muted bg-transparent py-2 h-auto cursor-pointer">
                        Edit
                    </Button>
                    <Link href={`/my-events/analytics/${displayData.id}`} className="flex-1">
                        <Button variant="secondary" size="sm" className="w-full bg-foreground text-background hover:bg-foreground/90 py-2 h-full cursor-pointer">
                            Analytics
                        </Button>
                    </Link>
                    <Link href={`/my-events/go-live/${displayData.id}`} className="flex-1">
                        <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 py-2 h-full cursor-pointer">
                            <Radio />
                            Go Live
                        </Button>
                    </Link>
                </div>
                <EditEventModal open={editModalOpen} onOpenChange={setEditModalOpen} eventData={event} />
            </div>
        </Card>
    );
}
