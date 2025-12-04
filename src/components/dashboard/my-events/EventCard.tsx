import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Eye, TrendingUp, Radio } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { EditEventModal } from "./EditEvent";
import Link from "next/link";

interface Event {
    id: string;
    title: string;
    category: string;
    description: string;
    date: string;
    time: string;
    location: string;
    sold: number;
    total: number;
    revenue: number;
    views: number;
    engagement: number;
    image: string;
    status: string;
}

export default function EventCard({ event }: { event: Event }) {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const soldPercentage = Math.round((event.sold / event.total) * 100);

    return (
        <Card className="overflow-hidden bg-card border-border hover:shadow-lg transition-shadow p-0">
            {/* Event Image */}
            <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <div className="absolute top-3 right-3">
                    <Badge className="bg-[#00C950] text-white hover:bg-green-700">published</Badge>
                </div>
            </div>

            {/* Content */}
            <div className="">
                {/* Title and Category */}
                <div className="mb-3 p-4 md:p-6 pt-0!">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{event.title}</h3>
                    <Badge variant="outline" className="text-xs">
                        {event.category}
                    </Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 px-4 md:px-6">{event.description}</p>

                {/* Date and Location */}
                <div className="space-y-2 mb-4 text-sm text-muted-foreground px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                            {event.date} at {event.time}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-border px-4 md:px-6">
                    {/* Sold */}
                    <div>
                        <div className="text-xs text-muted-foreground mb-1">Sold</div>
                        <div className="text-sm font-semibold text-foreground">
                            {event.sold} / {event.total}
                            <span className="text-xs font-normal ml-1">({soldPercentage}%)</span>
                        </div>
                    </div>

                    {/* Revenue */}
                    <div>
                        <div className="text-xs text-muted-foreground mb-1">Revenue</div>
                        <div className="text-sm font-semibold text-foreground">${event.revenue.toLocaleString()}</div>
                    </div>

                    {/* Views */}
                    <div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                            <Eye className="w-3 h-3" />
                            Views
                        </div>
                        <div className="text-sm font-semibold text-foreground">{event.views.toLocaleString()}</div>
                    </div>

                    {/* Engagement */}
                    <div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                            <TrendingUp className="w-3 h-3" />
                            Engagement
                        </div>
                        <div className="text-sm font-semibold text-foreground">{event.engagement}%</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 px-4 md:px-6 pb-4 md:pb-6">
                    <Button onClick={() => setEditModalOpen(true)} variant="outline" size="sm" className="flex-1 text-foreground border-border hover:bg-muted bg-transparent py-2 h-auto cursor-pointer">
                        Edit
                    </Button>
                    <Link href={`/my-events/analytics/${event.id}`} className="flex-1">
                        <Button variant="secondary" size="sm" className="w-full bg-foreground text-background hover:bg-foreground/90 py-2 h-full cursor-pointer">
                            Analytics
                        </Button>
                    </Link>
                    <Link href={`/my-events/go-live/${event.id}`} className="flex-1">
                        <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 py-2 h-full cursor-pointer">
                            <Radio />
                            Go Live
                        </Button>
                    </Link>
                </div>
                <EditEventModal open={editModalOpen} onOpenChange={setEditModalOpen} />
            </div>
        </Card>
    );
}
