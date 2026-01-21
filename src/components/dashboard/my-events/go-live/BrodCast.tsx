// "use client";

// import { useState } from "react";
// import StreamDetails from "./StreamDetails";
// import LivePlayer from "./LivePlayer";
// import LiveChat from "./LiveChat";

// const Broadcast = () => {
//     const [currentStreamId, setCurrentStreamId] = useState<string | null>(null);
//     const [isStreamActive, setIsStreamActive] = useState(false);

//     return (
//         <div className="flex flex-col h-screen  overflow-hidden">
//             <div className="border-b border-border pb-6 px-6">
//                 <StreamDetails onStreamStart={() => setIsStreamActive(true)} onStreamChange={setCurrentStreamId} />
//             </div>

//             <div className="flex-1 flex flex-col lg:flex-row overflow-hidden pt-3">
//                 <div className="lg:w-2/3 h-[60vh] lg:h-full p-6">
//                     <LivePlayer isStreamActive={isStreamActive} onStreamToggle={setIsStreamActive} />
//                 </div>

//                 <div className="lg:w-1/3 h-[40vh] lg:h-full border-t lg:border-t-0 lg:border-0 border-border">
//                     <LiveChat streamId={currentStreamId} isConnected={isStreamActive} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Broadcast;

// "use client";

// import { useState } from "react";
// import LiveStreamView from "./LiveStreamView";
// import StreamCreator from "./streamCreator";

// const Broadcast = () => {
//     const [currentStreamId, setCurrentStreamId] = useState<string | null>(null);
//     const [isStreamActive, setIsStreamActive] = useState(false);

//     // If no stream created yet, show stream creator
//     if (!currentStreamId) {
//         return (
//             <div className="h-screen flex items-center justify-center bg-background">
//                 <div className="max-w-2xl w-full p-6">
//                     <StreamCreator onStreamCreated={setCurrentStreamId} />
//                 </div>
//             </div>
//         );
//     }

//     // If stream exists, show live stream view
//     return (
//         <div className="flex flex-col h-screen bg-background overflow-hidden">
//             <LiveStreamView streamId={currentStreamId} isStreamActive={isStreamActive} onStreamActiveChange={setIsStreamActive} onStreamDeleted={() => setCurrentStreamId(null)} />
//         </div>
//     );
// };

// export default Broadcast;

"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Volume2, Settings, Play, Send, Users, Fullscreen, Minimize2, Loader2, EyeOff, Mic, MicOff, Square } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useCreateLivestreamMutation, useGetEventLivestreamsQuery, useStartLivestreamMutation, useEndLivestreamMutation } from "@/redux/features/stream/streamApi";
import AgoraRTC from "agora-rtc-sdk-ng";
import type { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { ChatMessage, useGetChatMessagesQuery, useGetChatParticipantsQuery, useSendMessageMutation } from "@/redux/features/streamChat/streamChatApi";

export default function LiveStreamWithChat() {
    const { id: eventId } = useParams();

    const [inputValue, setInputValue] = useState("");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [streamTitle, setStreamTitle] = useState("");
    const [streamDescription, setStreamDescription] = useState("");
    const [localStreamStatus, setLocalStreamStatus] = useState<string>("");
    const [isStartingStream, setIsStartingStream] = useState(false);
    const [isStoppingStream, setIsStoppingStream] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);

    const videoContainerRef = useRef<HTMLDivElement>(null);
    const localVideoTrackRef = useRef<ICameraVideoTrack | null>(null);
    const localAudioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);

    // RTK Queries
    const {
        data: streamsData,

        refetch: refetchStreams,
    } = useGetEventLivestreamsQuery(eventId as string, {
        refetchOnMountOrArgChange: true,
    });
    const [createLivestream, { isLoading: isCreatingStream }] = useCreateLivestreamMutation();
    const [startLivestream] = useStartLivestreamMutation();
    const [endLivestream] = useEndLivestreamMutation();

    const existingStream = streamsData?.data;

    const streamId = existingStream?.id;

    const { data: messagesData, isLoading: isLoadingMessages, refetch: refetchMessages } = useGetChatMessagesQuery({ streamId: streamId || "", limit: 50 }, { skip: !streamId });

    const { data: participantsData } = useGetChatParticipantsQuery(streamId || "", { skip: !streamId });
    const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

    const messages = messagesData?.data || [];
    const onlineUsers = participantsData?.data?.total || 0;

    // Use local state for immediate UI updates, fallback to API data
    const streamStatus = localStreamStatus || existingStream?.streamStatus || "";
    const isStreamActive = streamStatus === "live" || streamStatus === "starting";

    console.log("existingStream:", existingStream);
    console.log("streamStatus:", streamStatus);
    console.log("isStreamActive:", isStreamActive);
    console.log("streamId:", streamId);

    // Set existing stream data if available
    useEffect(() => {
        if (existingStream) {
            setStreamTitle(existingStream.title);
            setStreamDescription(existingStream.description || "");
            setLocalStreamStatus(existingStream.streamStatus);
        }
    }, [existingStream]);

    // Setup camera when stream is active
    useEffect(() => {
        if (isStreamActive && streamId) {
            setupLocalMedia();
        } else {
            cleanupLocalMedia();
        }

        return () => {
            cleanupLocalMedia();
        };
    }, [isStreamActive, streamId]);

    // Auto-refresh messages when stream is active
    useEffect(() => {
        if (isStreamActive && streamId) {
            const interval = setInterval(() => {
                refetchMessages();
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [isStreamActive, streamId, refetchMessages]);

    // Setup local media (camera + microphone)
    const setupLocalMedia = async () => {
        try {
            // Clean up existing tracks
            cleanupLocalMedia();

            // Get camera access
            const cameraTrack = await AgoraRTC.createCameraVideoTrack();
            const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();

            localVideoTrackRef.current = cameraTrack;
            localAudioTrackRef.current = microphoneTrack;

            // Play local video
            if (videoContainerRef.current) {
                videoContainerRef.current.innerHTML = "";
                const videoElement = document.createElement("div");
                videoElement.className = "w-full h-full";
                videoContainerRef.current.appendChild(videoElement);
                cameraTrack.play(videoElement);
            }

            setIsVideoEnabled(true);
            setIsAudioEnabled(true);
        } catch (error: any) {
            console.error("Error accessing media:", error);

            if (error.name === "NotAllowedError") {
                toast.error("Please allow camera and microphone access");
            } else if (error.name === "NotFoundError") {
                toast.error("No camera or microphone found");
            } else {
                toast.error("Failed to access media devices");
            }
            throw error;
        }
    };

    // Cleanup local media
    const cleanupLocalMedia = () => {
        if (localVideoTrackRef.current) {
            localVideoTrackRef.current.stop();
            localVideoTrackRef.current.close();
            localVideoTrackRef.current = null;
        }
        if (localAudioTrackRef.current) {
            localAudioTrackRef.current.stop();
            localAudioTrackRef.current.close();
            localAudioTrackRef.current = null;
        }

        // Clear video container
        if (videoContainerRef.current) {
            videoContainerRef.current.innerHTML = "";
        }
    };

    // Create a new stream
    const handleCreateStream = async () => {
        if (!streamTitle.trim()) {
            toast.error("Please enter a stream title");
            return;
        }

        try {
            const result = await createLivestream({
                eventId: eventId as string,
                title: streamTitle,
                description: streamDescription,
            }).unwrap();

            if (result.success) {
                toast.success("Stream created successfully!");
                // Force refetch
                setTimeout(() => refetchStreams(), 100);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to create stream");
        }
    };

    // Start the stream
    const handleStartStream = async () => {
        if (!streamId) {
            toast.error("Please create a stream first");
            return;
        }

        setIsStartingStream(true);
        // Optimistically update UI
        setLocalStreamStatus("starting");

        try {
            const result = await startLivestream(streamId).unwrap();

            if (result.success) {
                toast.success("Stream started successfully!");
                // Force refetch to get updated status
                setTimeout(() => refetchStreams(), 100);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to start stream");
            // Revert optimistic update on error
            setLocalStreamStatus("scheduled");
        } finally {
            setIsStartingStream(false);
        }
    };

    // Stop the stream
    const handleStopStream = async () => {
        if (!streamId) return;

        setIsStoppingStream(true);

        try {
            const result = await endLivestream(streamId).unwrap();

            if (result.success) {
                toast.success("Stream stopped successfully!");
                cleanupLocalMedia();
                // Force refetch to get updated status
                setTimeout(() => refetchStreams(), 100);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to stop stream");
        } finally {
            setIsStoppingStream(false);
        }
    };

    // Toggle video
    const toggleVideo = async () => {
        if (localVideoTrackRef.current) {
            try {
                await localVideoTrackRef.current.setEnabled(!isVideoEnabled);
                setIsVideoEnabled(!isVideoEnabled);
                toast.info(isVideoEnabled ? "Video turned off" : "Video turned on");
            } catch (error) {
                console.error("Error toggling video:", error);
            }
        }
    };

    // Toggle audio
    const toggleAudio = async () => {
        if (localAudioTrackRef.current) {
            try {
                await localAudioTrackRef.current.setEnabled(!isAudioEnabled);
                setIsAudioEnabled(!isAudioEnabled);
                toast.info(isAudioEnabled ? "Microphone muted" : "Microphone unmuted");
            } catch (error) {
                console.error("Error toggling audio:", error);
            }
        }
    };

    // Send chat message
    const handleSendMessage = async () => {
        if (!inputValue.trim() || !streamId) return;

        try {
            await sendMessage({
                streamId,
                message: inputValue.trim(),
            }).unwrap();

            setInputValue("");
            refetchMessages();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to send message");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            const element = videoContainerRef.current;
            if (element) {
                element.requestFullscreen().catch(console.error);
            }
        } else {
            document.exitFullscreen().catch(console.error);
        }
    };

    // Listen for fullscreen change events
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    // Format time for chat messages
    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div>
            <div className="border-b border-border pb-8">
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">Title</label>
                        <Input value={streamTitle} onChange={(e) => setStreamTitle(e.target.value)} placeholder="Enter stream title" className="bg-muted rounded-lg p-4 min-h-12 text-foreground" disabled={!!existingStream} />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">Description</label>
                        <Textarea value={streamDescription} onChange={(e) => setStreamDescription(e.target.value)} placeholder="Enter stream description" className="bg-muted rounded-lg p-4 min-h-32 text-foreground resize-none" rows={5} disabled={!!existingStream} />
                    </div>

                    <div className="flex gap-3">
                        {!existingStream ? (
                            <Button onClick={handleCreateStream} disabled={isCreatingStream || !streamTitle.trim()} className="gap-2">
                                {isCreatingStream ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4" />
                                        Create Stream
                                    </>
                                )}
                            </Button>
                        ) : (
                            <div className="flex items-center gap-2 text-sm">
                                <div className={`w-2 h-2 rounded-full ${streamStatus === "live" ? "bg-red-500 animate-pulse" : streamStatus === "starting" ? "bg-yellow-500 animate-pulse" : streamStatus === "scheduled" ? "bg-blue-500" : "bg-gray-500"}`} />
                                <span className={streamStatus === "live" ? "text-red-600" : streamStatus === "starting" ? "text-yellow-600" : streamStatus === "scheduled" ? "text-blue-600" : "text-gray-600"}>{streamStatus === "live" ? "Stream is LIVE" : streamStatus === "starting" ? "Stream is starting..." : streamStatus === "scheduled" ? "Stream is scheduled" : "Stream ended"}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Live Stream Section */}
                    <div className="lg:col-span-2">
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
                                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
                                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Fullscreen className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div ref={videoContainerRef} className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                                {isStreamActive ? (
                                    // Show camera when stream is live or starting
                                    <>
                                        {/* Camera feed will show here */}
                                        <div className="absolute top-4 left-4 z-10">
                                            <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
                                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                                <span className="text-xs font-semibold">LIVE</span>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                                            <Button variant={isVideoEnabled ? "secondary" : "destructive"} size="icon" className="rounded-full w-10 h-10" onClick={toggleVideo}>
                                                {isVideoEnabled ? <EyeOff className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                            </Button>
                                            <Button variant={isAudioEnabled ? "secondary" : "destructive"} size="icon" className="rounded-full w-10 h-10" onClick={toggleAudio}>
                                                {isAudioEnabled ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                                            </Button>
                                            <Button variant="destructive" size="icon" className="rounded-full w-10 h-10" onClick={handleStopStream} disabled={isStoppingStream}>
                                                {isStoppingStream ? <Loader2 className="h-4 w-4 animate-spin" /> : <Square className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    // Show start stream UI when stream is not active
                                    <div className="text-center text-white space-y-4">
                                        <Play className="w-16 h-16 mx-auto opacity-50" strokeWidth={1} />
                                        <div>
                                            <p className="text-lg font-semibold">{!existingStream ? "No Stream Created" : streamStatus === "scheduled" ? "Stream is Ready" : streamStatus === "ended" ? "Stream Has Ended" : "Stream Not Active"}</p>
                                            <p className="text-sm text-gray-400">{!existingStream ? "Create a stream first" : streamStatus === "scheduled" ? "Click Start to begin broadcasting" : streamStatus === "ended" ? "This stream has concluded" : "Ready to start streaming"}</p>
                                        </div>
                                        {/* Only show Start button when stream is scheduled */}
                                        {existingStream && streamStatus === "scheduled" && (
                                            <Button onClick={handleStartStream} className="gap-2 bg-white text-black hover:bg-gray-200" disabled={isStartingStream}>
                                                {isStartingStream ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Starting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Play className="w-4 h-4" />
                                                        Start Live Stream
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Chat Section */}
                    <div className="lg:col-span-1">
                        <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden justify-between">
                            <div className="flex items-center justify-between p-4 border-b border-border">
                                <div>
                                    <h2 className="text-lg font-semibold">Live Chat</h2>
                                    <p className="text-xs text-muted-foreground">{isStreamActive ? "Interact with your audience in real-time" : streamStatus === "scheduled" ? "Chat will be available when stream starts" : streamStatus === "ended" ? "Chat is now read-only" : "Chat not available"}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm font-medium">{onlineUsers}</span>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[400px]">
                                {isLoadingMessages ? (
                                    <div className="flex justify-center items-center h-20">
                                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                        <div className="text-muted-foreground space-y-1">
                                            <p className="text-sm font-medium">{isStreamActive ? "No messages yet" : streamStatus === "scheduled" ? "Start stream to enable chat" : "Chat not available"}</p>
                                            <p className="text-xs">{isStreamActive ? "Be the first to send a message!" : streamStatus === "scheduled" ? "Chat will appear here" : "Chat is disabled"}</p>
                                        </div>
                                    </div>
                                ) : (
                                    messages.map((msg: ChatMessage) => (
                                        <div key={msg.id} className="text-sm bg-muted rounded-lg p-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-medium text-foreground">{msg.userProfile?.name || "User"}</span>
                                                <span className="text-xs text-muted-foreground">{formatTime(msg.createdAt)}</span>
                                            </div>
                                            <p className="text-foreground">{msg.message}</p>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-4 border-t border-border">
                                <div className="flex items-center gap-2">
                                    <Input
                                        placeholder={isStreamActive ? "Type a message..." : streamStatus === "scheduled" ? "Start stream to enable chat" : streamStatus === "ended" ? "Chat is now read-only" : "Chat not available"}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        className="flex-1 bg-background"
                                        disabled={!isStreamActive || isSendingMessage}
                                    />
                                    <Button onClick={handleSendMessage} size="sm" className="gap-2 bg-foreground text-background hover:opacity-90 shrink-0" disabled={!inputValue.trim() || !isStreamActive || isSendingMessage}>
                                        {isSendingMessage ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                <span className="hidden sm:inline">Send</span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
