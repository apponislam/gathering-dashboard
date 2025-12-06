"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Video, Calendar } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EventHeaderAndDetails() {
    return (
        <div className="border-b border-border pb-8">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-text-balance font-bold text-2xl">Tech Conference 2025</h1>
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
                    Convention Center, San Francisco
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    09:00
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    November 15, 2025
                </div>
                <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Not Started</span>
            </div>

            <div className="mt-4 mb-6 flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm">
                    <Video className="w-4 h-4" />
                    <span>Live Stream</span>
                </div>
            </div>

            {/* Details Input Section */}
            <div className="space-y-6">
                <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Title</label>
                    <Input defaultValue="Tech Conference 2025 - Innovation & Development" className="bg-muted rounded-lg p-4 min-h-12 text-foreground" />
                </div>

                <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Description</label>
                    <Textarea defaultValue="Join industry leaders and innovators for a full day of cutting-edge talks, workshops, and networking. Discover the latest trends in web development, AI, and cloud technologies." className="bg-muted rounded-lg p-4 min-h-32 text-foreground resize-none" rows={5} />
                </div>
            </div>
        </div>
    );
}
