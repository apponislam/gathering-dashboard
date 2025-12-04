"use client";

import { Button } from "@/components/ui/button";
import { Volume2, Settings, Share2, Play } from "lucide-react";

interface LiveStreamSectionProps {
    isActive: boolean;
    onStartStream: () => void;
}

export default function LiveStreamSection({ isActive, onStartStream }: LiveStreamSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Live Stream</h2>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <Share2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                {!isActive ? (
                    <div className="text-center text-white space-y-4">
                        <Play className="w-16 h-16 mx-auto opacity-50" strokeWidth={1} />
                        <div>
                            <p className="text-lg font-semibold">Stream Not Active</p>
                            <p className="text-sm text-gray-400">Start the stream to broadcast your event</p>
                        </div>
                        <Button onClick={onStartStream} className="gap-2 bg-white text-black hover:bg-gray-200">
                            <Play className="w-4 h-4" />
                            Start Live Stream
                        </Button>
                    </div>
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                        <div className="text-white text-center">
                            <div className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                            <span>Live</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
