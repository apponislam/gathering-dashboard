// components/broadcast/StreamInfo.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Settings, RefreshCw, Info } from "lucide-react";
import { useGetEventLivestreamsQuery } from "@/redux/features/stream/streamApi";
import { useParams } from "next/navigation";

interface StreamInfoProps {
    streamId: string;
    onSettingsClick: () => void;
}

const StreamInfo = ({ streamId, onSettingsClick }: StreamInfoProps) => {
    const params = useParams();
    const eventId = params.id as string;

    const { data: response, isLoading, refetch } = useGetEventLivestreamsQuery(eventId);
    const stream = response?.data;

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    {stream?.isLive && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                    <h2 className="text-lg font-semibold">{stream?.title || "Loading..."}</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Info className="w-4 h-4" />
                    <span>Viewers: {stream?.currentViewers || 0}</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => refetch()} disabled={isLoading}>
                    <RefreshCw className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onSettingsClick}>
                    <Settings className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default StreamInfo;
