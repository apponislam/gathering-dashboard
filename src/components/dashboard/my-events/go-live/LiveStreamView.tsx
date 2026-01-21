// components/broadcast/LiveStreamView.tsx
"use client";

import { useState } from "react";
import LivePlayer from "./LivePlayer";
import LiveChat from "./LiveChat";
import StreamInfo from "./StreamInfo";

interface LiveStreamViewProps {
    streamId: string;
    isStreamActive: boolean;
    onStreamActiveChange: (active: boolean) => void;
    onStreamDeleted: () => void;
}

const LiveStreamView = ({ streamId, isStreamActive, onStreamActiveChange, onStreamDeleted }: LiveStreamViewProps) => {
    const [showSettings, setShowSettings] = useState(false);

    return (
        <>
            {/* Top Bar with Stream Info */}
            <div className="border-b border-border p-4">
                <StreamInfo streamId={streamId} onSettingsClick={() => setShowSettings(!showSettings)} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Live Player Section */}
                <div className="lg:w-2/3 h-[60vh] lg:h-full p-6">
                    <LivePlayer streamId={streamId} isStreamActive={isStreamActive} onStreamActiveChange={onStreamActiveChange} />
                </div>

                {/* Live Chat Section */}
                <div className="lg:w-1/3 h-[40vh] lg:h-full border-t lg:border-t-0 lg:border-l border-border">
                    <LiveChat streamId={streamId} isConnected={isStreamActive} />
                </div>
            </div>

            {/* Settings Panel (Optional) */}
            {showSettings && (
                <div className="absolute top-0 right-0 w-80 h-full bg-background border-l border-border shadow-lg z-50 p-6">
                    <h3 className="font-semibold mb-4">Stream Settings</h3>
                    <p className="text-sm text-muted-foreground">Stream settings and controls will appear here</p>
                </div>
            )}
        </>
    );
};

export default LiveStreamView;
