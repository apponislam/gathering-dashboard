// "use client";

// import { useState } from "react";
// import { useParams } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Loader2, Video, Play, Radio } from "lucide-react";
// import { toast } from "sonner";
// import { useCreateLivestreamMutation, useGetEventLivestreamsQuery } from "@/redux/features/stream/streamApi";

// interface StreamDetailsProps {
//     onStreamStart: () => void;
//     onStreamChange: (streamId: string | null) => void;
// }

// const StreamDetails = ({ onStreamStart, onStreamChange }: StreamDetailsProps) => {
//     const params = useParams();
//     const eventId = params.id as string;

//     const [streamTitle, setStreamTitle] = useState("");
//     const [streamDescription, setStreamDescription] = useState("");

//     // RTK Queries
//     const { data: response, isLoading: isLoadingStreams } = useGetEventLivestreamsQuery(eventId);
//     const [createLivestream, { isLoading: isCreatingStream }] = useCreateLivestreamMutation();

//     // Get the existing stream
//     const existingStream = response?.data;

//     // If there's an existing stream, use its data and notify parent
//     if (existingStream) {
//         if (!streamTitle) setStreamTitle(existingStream.title);
//         if (!streamDescription) setStreamDescription(existingStream.description || "");
//         onStreamChange(existingStream.id);
//     }

//     // Create a new live stream
//     const handleCreateStream = async () => {
//         if (!streamTitle.trim()) {
//             toast.error("Please enter a stream title");
//             return;
//         }

//         try {
//             const result = await createLivestream({
//                 eventId,
//                 title: streamTitle,
//                 description: streamDescription,
//             }).unwrap();

//             if (result.success) {
//                 toast.success("Stream created successfully!");
//                 onStreamChange(result.data.id);
//             }
//         } catch (error: any) {
//             toast.error(error?.data?.message || "Failed to create stream");
//         }
//     };

//     // Go Live button
//     const handleGoLive = () => {
//         if (existingStream?.id) {
//             onStreamChange(existingStream.id);
//             onStreamStart();
//             toast.success("Going live!");
//         } else {
//             toast.error("Please create a stream first");
//         }
//     };

//     return (
//         <div className="space-y-6">
//             {/* SIMPLE FORM - Exactly like your original */}
//             <div className="space-y-6">
//                 <div>
//                     <Label className="text-sm font-semibold text-foreground mb-2 block">Title</Label>
//                     <Input value={streamTitle} onChange={(e) => setStreamTitle(e.target.value)} className="bg-muted rounded-lg p-4 min-h-12 text-foreground" placeholder="Enter stream title" />
//                 </div>

//                 <div>
//                     <Label className="text-sm font-semibold text-foreground mb-2 block">Description</Label>
//                     <Textarea value={streamDescription} onChange={(e) => setStreamDescription(e.target.value)} className="bg-muted rounded-lg p-4 min-h-32 text-foreground resize-none" rows={5} placeholder="Describe your stream" />
//                 </div>
//             </div>

//             {/* Show existing stream info BELOW the form */}
//             {existingStream && (
//                 <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                     <div className="flex items-center gap-2 mb-2">
//                         <Radio className="w-4 h-4 text-blue-600" />
//                         <span className="text-sm font-medium text-blue-800">Existing stream detected</span>
//                     </div>
//                     <div className="text-sm text-blue-700 space-y-1">
//                         <p>
//                             <span className="font-medium">Status:</span> {existingStream.streamStatus}
//                         </p>
//                         <p>
//                             <span className="font-medium">Created:</span> {new Date(existingStream.createdAt).toLocaleDateString()}
//                         </p>
//                     </div>
//                 </div>
//             )}

//             {/* BUTTONS - Clean and simple */}
//             <div className="flex gap-3 pt-4">
//                 {!existingStream ? (
//                     // CREATE STREAM button (when no stream exists)
//                     <Button onClick={handleCreateStream} disabled={isCreatingStream || !streamTitle.trim()} className="flex-1 gap-2">
//                         {isCreatingStream ? (
//                             <>
//                                 <Loader2 className="w-4 h-4 animate-spin" />
//                                 Creating...
//                             </>
//                         ) : (
//                             <>
//                                 <Video className="w-4 h-4" />
//                                 Create Stream
//                             </>
//                         )}
//                     </Button>
//                 ) : (
//                     // GO LIVE button (when stream exists)
//                     <Button onClick={handleGoLive} className="flex-1 gap-2 bg-green-600 hover:bg-green-700" disabled={existingStream.isLive}>
//                         <Play className="w-4 h-4" />
//                         {existingStream.isLive ? "Stream is Live" : "Go Live"}
//                     </Button>
//                 )}
//             </div>

//             {/* Loading state */}
//             {isLoadingStreams && (
//                 <div className="text-center py-4">
//                     <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
//                     <p className="text-sm text-muted-foreground mt-2">Checking for existing stream...</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default StreamDetails;

// components/broadcast/StreamDetails.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Video, Play, Radio } from "lucide-react";
import { toast } from "sonner";
import { useCreateLivestreamMutation, useGetEventLivestreamsQuery, useStartLivestreamMutation } from "@/redux/features/stream/streamApi";

interface StreamDetailsProps {
    onStreamStart: (streamId: string) => void;
    onStreamChange: (streamId: string | null) => void;
}

const StreamDetails = ({ onStreamStart, onStreamChange }: StreamDetailsProps) => {
    const params = useParams();
    const eventId = params.id as string;

    const [streamTitle, setStreamTitle] = useState("");
    const [streamDescription, setStreamDescription] = useState("");
    const [selectedStreamId, setSelectedStreamId] = useState<string | null>(null);

    // RTK Queries
    const { data: response, isLoading: isLoadingStreams, refetch } = useGetEventLivestreamsQuery(eventId);
    const [createLivestream, { isLoading: isCreatingStream }] = useCreateLivestreamMutation();
    const [startLivestream, { isLoading: isStartingStream }] = useStartLivestreamMutation();

    // Get the existing stream
    const existingStream = response?.data;

    // Handle stream selection
    useEffect(() => {
        if (existingStream?.id) {
            setSelectedStreamId(existingStream.id);
            setStreamTitle(existingStream.title);
            setStreamDescription(existingStream.description || "");
            onStreamChange(existingStream.id);
        }
    }, [existingStream, onStreamChange]);

    // Create a new live stream
    const handleCreateStream = async () => {
        if (!streamTitle.trim()) {
            toast.error("Please enter a stream title");
            return;
        }

        try {
            const result = await createLivestream({
                eventId,
                title: streamTitle,
                description: streamDescription,
            }).unwrap();

            if (result.success) {
                toast.success("Stream created successfully!");
                setSelectedStreamId(result.data.id);
                onStreamChange(result.data.id);
                refetch(); // Refresh the stream list
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to create stream");
        }
    };

    // Go Live button - Actually starts the stream using the API
    const handleGoLive = async () => {
        if (!selectedStreamId) {
            toast.error("Please select or create a stream first");
            return;
        }

        if (existingStream?.isLive) {
            toast.info("Stream is already live!");
            onStreamStart(selectedStreamId);
            return;
        }

        try {
            const result = await startLivestream(selectedStreamId).unwrap();

            if (result.success) {
                toast.success("Stream started successfully!");
                onStreamStart(selectedStreamId);
                refetch(); // Refresh stream status
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to start stream");
        }
    };

    return (
        <div className="space-y-6">
            {/* SIMPLE FORM */}
            <div className="space-y-6">
                <div>
                    <Label className="text-sm font-semibold text-foreground mb-2 block">Title</Label>
                    <Input value={streamTitle} onChange={(e) => setStreamTitle(e.target.value)} className="bg-muted rounded-lg p-4 min-h-12 text-foreground" placeholder="Enter stream title" />
                </div>

                <div>
                    <Label className="text-sm font-semibold text-foreground mb-2 block">Description</Label>
                    <Textarea value={streamDescription} onChange={(e) => setStreamDescription(e.target.value)} className="bg-muted rounded-lg p-4 min-h-32 text-foreground resize-none" rows={5} placeholder="Describe your stream" />
                </div>
            </div>

            {/* Stream Status */}
            {existingStream && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <Radio className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">{existingStream.isLive ? "✅ Stream is LIVE" : "⏳ Stream is scheduled"}</span>
                    </div>
                    <div className="text-sm text-blue-700 space-y-1">
                        <p>
                            <span className="font-medium">Status:</span> {existingStream.streamStatus}
                        </p>
                        <p>
                            <span className="font-medium">Viewers:</span> {existingStream.currentViewers}
                        </p>
                        <p>
                            <span className="font-medium">Channel:</span> {existingStream.channelName}
                        </p>
                    </div>
                </div>
            )}

            {/* BUTTONS */}
            <div className="flex gap-3 pt-4">
                <Button onClick={handleCreateStream} disabled={isCreatingStream || !streamTitle.trim()} className="flex-1 gap-2">
                    {isCreatingStream ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        <>
                            <Video className="w-4 h-4" />
                            Create Stream
                        </>
                    )}
                </Button>

                <Button onClick={handleGoLive} variant="secondary" className="flex-1 gap-2" disabled={!selectedStreamId || isStartingStream}>
                    {isStartingStream ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Starting...
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4" />
                            {existingStream?.isLive ? "Already Live" : "Start Stream"}
                        </>
                    )}
                </Button>
            </div>

            {/* Loading */}
            {isLoadingStreams && (
                <div className="text-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                </div>
            )}
        </div>
    );
};

export default StreamDetails;
