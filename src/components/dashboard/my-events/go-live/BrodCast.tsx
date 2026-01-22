"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Send, Users, Fullscreen, Minimize2, Loader2, EyeOff, MicOff, Square, Video, Mic as MicIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useCreateLivestreamMutation, useGetEventLivestreamsQuery, useStartLivestreamMutation, useEndLivestreamMutation, useLazyGetAgoraTokenQuery } from "@/redux/features/stream/streamApi";
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
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
    const [isAgoraJoined, setIsAgoraJoined] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);

    const videoContainerRef = useRef<HTMLDivElement>(null);
    const clientRef = useRef<IAgoraRTCClient | null>(null);
    const localVideoTrackRef = useRef<ICameraVideoTrack | null>(null);
    const localAudioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);

    // RTK Queries
    const { data: streamsData, refetch: refetchStreams } = useGetEventLivestreamsQuery(eventId as string, {
        refetchOnMountOrArgChange: true,
    });
    const [createLivestream, { isLoading: isCreatingStream }] = useCreateLivestreamMutation();
    const [startLivestream] = useStartLivestreamMutation();
    const [endLivestream] = useEndLivestreamMutation();
    const [getAgoraToken, { isLoading: isLoadingToken }] = useLazyGetAgoraTokenQuery();

    const existingStream = streamsData?.data;
    const streamId = existingStream?.id;

    const { data: messagesData, isLoading: isLoadingMessages, refetch: refetchMessages } = useGetChatMessagesQuery({ streamId: streamId || "", limit: 50 }, { skip: !streamId });
    const { data: participantsData } = useGetChatParticipantsQuery(streamId || "", { skip: !streamId });
    const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

    const messages = messagesData?.data || [];
    const onlineUsers = participantsData?.data?.total || 0;

    // Use local state for immediate UI updates, fallback to API data
    const streamStatus = localStreamStatus || existingStream?.streamStatus || "";

    // SIMPLE LOGIC: Just check specific statuses
    const isStreamScheduled = streamStatus === "scheduled";
    const isStreamLive = streamStatus === "live";
    const isStreamEnded = streamStatus === "ended";
    const isStreamStarting = streamStatus === "starting";
    const isStreamCancelled = streamStatus === "cancelled";

    console.log("existingStream:", existingStream);
    console.log("streamStatus:", streamStatus);
    console.log("isStreamScheduled:", isStreamScheduled);
    console.log("isStreamLive:", isStreamLive);
    console.log("isCameraReady:", isCameraReady);
    console.log("localVideoTrackRef.current:", !!localVideoTrackRef.current);

    // Initialize Agora client
    const initializeAgoraClient = useCallback(() => {
        if (!clientRef.current) {
            try {
                clientRef.current = AgoraRTC.createClient({
                    mode: "live",
                    codec: "vp8",
                });
                console.log("Agora client initialized");
            } catch (error) {
                console.error("Error initializing Agora client:", error);
            }
        }
        return clientRef.current;
    }, []);

    // Set existing stream data if available
    useEffect(() => {
        if (existingStream) {
            setStreamTitle(existingStream.title);
            setStreamDescription(existingStream.description || "");
            setLocalStreamStatus(existingStream.streamStatus);
        }
    }, [existingStream]);

    // Initialize Agora client on mount
    useEffect(() => {
        const client = initializeAgoraClient();

        return () => {
            cleanupAgora();
        };
    }, [initializeAgoraClient]);

    // Cleanup Agora resources - SIMPLIFIED
    const cleanupAgora = async () => {
        console.log("Cleaning up Agora resources");

        try {
            // Stop tracks first
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

            // Leave channel if joined
            if (clientRef.current && isAgoraJoined) {
                await clientRef.current.leave();
                setIsAgoraJoined(false);
            }

            setIsCameraReady(false);
            setCameraError(null);

            console.log("Agora cleanup complete");
        } catch (error) {
            console.error("Error cleaning up Agora:", error);
        }
    };

    // Check camera availability
    const checkCameraAccess = async (): Promise<boolean> => {
        try {
            // Try to access camera with simple settings
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    frameRate: { ideal: 15 },
                },
                audio: false,
            });

            // Stop the test stream
            stream.getTracks().forEach((track) => track.stop());
            return true;
        } catch (error: any) {
            console.error("Camera access test failed:", error);
            return false;
        }
    };

    // Setup camera and join Agora channel - FIXED
    const setupCameraAndJoinAgora = async () => {
        if (!streamId) {
            toast.error("No stream ID found");
            return;
        }

        setCameraError(null);
        setIsCameraReady(false);

        try {
            // 1. Cleanup any existing resources
            await cleanupAgora();

            // 2. First check if camera is accessible
            const hasCameraAccess = await checkCameraAccess();
            if (!hasCameraAccess) {
                throw new Error("Camera access denied or not available. Please allow camera permissions.");
            }

            // 3. Get Agora token from API
            const tokenResult = await getAgoraToken(streamId).unwrap();
            if (!tokenResult.success) {
                throw new Error(tokenResult.message || "Failed to get token");
            }

            const tokenData = tokenResult.data;
            console.log("Got token data:", tokenData);

            // 4. Initialize client if needed
            const client = initializeAgoraClient();
            if (!client) {
                throw new Error("Failed to initialize Agora client");
            }

            // 5. Join Agora channel first
            const appId = tokenData.token.substring(3, 27);
            await client.join(appId, tokenData.channelName, tokenData.token, tokenData.uid || null);
            setIsAgoraJoined(true);

            // 6. Set client role based on token role
            const clientRole = tokenData.role === "publisher" ? "host" : "audience";
            await client.setClientRole(clientRole);

            // 7. If broadcaster (host), create and publish tracks
            if (clientRole === "host") {
                try {
                    // Create tracks with simpler settings
                    const cameraTrack = await AgoraRTC.createCameraVideoTrack({
                        encoderConfig: "480p",
                        optimizationMode: "motion",
                    });

                    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack({
                        AEC: true,
                        ANS: true,
                        AGC: true,
                    });

                    localVideoTrackRef.current = cameraTrack;
                    localAudioTrackRef.current = microphoneTrack;

                    // Publish tracks to Agora
                    await client.publish([cameraTrack, microphoneTrack]);

                    // Play local video directly in container
                    if (videoContainerRef.current) {
                        cameraTrack.play(videoContainerRef.current);

                        // Wait for video to start
                        setTimeout(() => {
                            console.log("Camera track should be playing");
                            setIsCameraReady(true);
                        }, 1000);
                    }

                    setIsVideoEnabled(true);
                    setIsAudioEnabled(true);

                    console.log("Camera setup complete");
                    toast.success("Streaming started! Your broadcast is now live.");
                } catch (trackError: any) {
                    console.error("Error creating media tracks:", trackError);

                    if (trackError.name === "NotAllowedError") {
                        throw new Error("Camera/microphone access denied. Please allow permissions.");
                    } else if (trackError.name === "NotFoundError") {
                        throw new Error("No camera or microphone found on your device.");
                    } else if (trackError.message?.includes("timeout") || trackError.message?.includes("AbortError")) {
                        throw new Error("Camera is taking too long to start. Try:\n1. Refresh page\n2. Check browser permissions\n3. Close other apps using camera");
                    } else {
                        throw new Error("Failed to start camera: " + (trackError.message || "Unknown error"));
                    }
                }
            } else {
                toast.success("Joined stream as viewer");
            }
        } catch (error: any) {
            console.error("Error setting up camera/Agora:", error);

            const errorMessage = error.message || "Failed to start streaming";

            // Set specific camera error for UI
            if (error.message?.includes("Camera") || error.message?.includes("timeout") || error.message?.includes("AbortError")) {
                setCameraError(errorMessage);
            }

            toast.error(errorMessage);

            // Cleanup on error
            await cleanupAgora();
            throw error;
        }
    };

    // Setup camera when stream is live
    useEffect(() => {
        if (isStreamLive && streamId) {
            console.log("Stream is live, setting up camera and Agora");
            setupCameraAndJoinAgora().catch((error) => {
                console.error("Failed to setup camera:", error);
            });
        } else {
            // When stream is not live, cleanup
            console.log("Stream is not live, cleaning up");
            cleanupAgora();
        }
    }, [isStreamLive, streamId]);

    // Auto-refresh messages when stream is live
    useEffect(() => {
        if (isStreamLive && streamId) {
            const interval = setInterval(() => {
                refetchMessages();
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [isStreamLive, streamId, refetchMessages]);

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
                setLocalStreamStatus("scheduled");
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
        setLocalStreamStatus("live");

        try {
            const result = await startLivestream(streamId).unwrap();

            if (result.success) {
                toast.success("Stream started successfully!");
                setTimeout(() => refetchStreams(), 100);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to start stream");
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
            await cleanupAgora();

            const result = await endLivestream(streamId).unwrap();

            if (result.success) {
                toast.success("Stream stopped successfully!");
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
                                <div className={`w-2 h-2 rounded-full ${isStreamLive ? "bg-red-500 animate-pulse" : isStreamStarting ? "bg-yellow-500 animate-pulse" : isStreamScheduled ? "bg-blue-500" : isStreamEnded ? "bg-gray-500" : isStreamCancelled ? "bg-gray-500" : "bg-green-500"}`} />
                                <span className={isStreamLive ? "text-red-600" : isStreamStarting ? "text-yellow-600" : isStreamScheduled ? "text-blue-600" : isStreamEnded ? "text-gray-600" : isStreamCancelled ? "text-gray-600" : "text-green-600"}>
                                    {isStreamLive ? "Stream is LIVE" : isStreamStarting ? "Stream is starting..." : isStreamScheduled ? "Stream is scheduled" : isStreamEnded ? "Stream has ended" : isStreamCancelled ? "Stream was cancelled" : "Stream created"}
                                </span>
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
                                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
                                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Fullscreen className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div ref={videoContainerRef} className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                                {/* Show black screen for ended, cancelled, starting */}
                                {isStreamEnded || isStreamCancelled || isStreamStarting ? (
                                    <div className="text-center text-white space-y-4">
                                        <Play className="w-16 h-16 mx-auto opacity-50" strokeWidth={1} />
                                        <div>
                                            <p className="text-lg font-semibold">{isStreamEnded ? "Stream Has Ended" : isStreamCancelled ? "Stream Was Cancelled" : "Stream is Starting..."}</p>
                                            <p className="text-sm text-gray-400">{isStreamEnded ? "This stream has concluded" : isStreamCancelled ? "This stream was cancelled" : "Stream will start shortly..."}</p>
                                        </div>
                                    </div>
                                ) : isStreamLive ? (
                                    // Show camera when stream is live - FIXED LAYOUT
                                    <div className="absolute inset-0 w-full h-full">
                                        {/* LIVE badge */}
                                        <div className="absolute top-4 left-4 z-10">
                                            <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
                                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                                <span className="text-xs font-semibold">LIVE</span>
                                            </div>
                                        </div>

                                        {/* Camera error message */}
                                        {cameraError && (
                                            <div className="absolute top-20 left-4 right-4 z-30 bg-red-900/80 backdrop-blur-sm text-white p-4 rounded-lg">
                                                <p className="font-semibold">Camera Error</p>
                                                <p className="text-sm mt-1">{cameraError}</p>
                                                <Button
                                                    onClick={() => {
                                                        setCameraError(null);
                                                        setupCameraAndJoinAgora();
                                                    }}
                                                    size="sm"
                                                    className="mt-2 bg-white text-red-700 hover:bg-gray-100"
                                                >
                                                    Retry Camera
                                                </Button>
                                            </div>
                                        )}

                                        {/* Loading overlay - only show when camera is NOT ready */}
                                        {(isLoadingToken || !isCameraReady) && !cameraError && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20">
                                                <div className="text-center text-white space-y-4">
                                                    <Loader2 className="w-16 h-16 mx-auto opacity-50 animate-spin" />
                                                    <p className="text-lg font-semibold">{isLoadingToken ? "Getting streaming token..." : "Setting up camera..."}</p>
                                                    <p className="text-sm text-gray-400">Please wait while we connect your camera</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Control buttons - ALWAYS VISIBLE when stream is live */}
                                        {isCameraReady && (
                                            <div className="absolute bottom-4 right-4 z-30 flex gap-2">
                                                <Button variant={isVideoEnabled ? "secondary" : "destructive"} size="icon" className="rounded-full w-10 h-10 bg-black/70 backdrop-blur-sm border border-white/20 hover:bg-black/90 shadow-lg" onClick={toggleVideo} disabled={!localVideoTrackRef.current}>
                                                    {isVideoEnabled ? <Video className="h-4 w-4 text-white" /> : <EyeOff className="h-4 w-4 text-white" />}
                                                </Button>
                                                <Button variant={isAudioEnabled ? "secondary" : "destructive"} size="icon" className="rounded-full w-10 h-10 bg-black/70 backdrop-blur-sm border border-white/20 hover:bg-black/90 shadow-lg" onClick={toggleAudio} disabled={!localAudioTrackRef.current}>
                                                    {isAudioEnabled ? <MicIcon className="h-4 w-4 text-white" /> : <MicOff className="h-4 w-4 text-white" />}
                                                </Button>
                                                <Button variant="destructive" size="icon" className="rounded-full w-10 h-10 bg-red-600 hover:bg-red-700 shadow-xl border-2 border-white/20" onClick={handleStopStream} disabled={isStoppingStream}>
                                                    {isStoppingStream ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Square className="h-4 w-4 text-white" />}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // Show start stream UI when stream is scheduled
                                    <div className="text-center text-white space-y-4">
                                        <Play className="w-16 h-16 mx-auto opacity-50" strokeWidth={1} />
                                        <div>
                                            <p className="text-lg font-semibold">{!existingStream ? "No Stream Created" : isStreamScheduled ? "Stream is Ready" : "Stream Not Active"}</p>
                                            <p className="text-sm text-gray-400">{!existingStream ? "Create a stream first" : isStreamScheduled ? "Click Start to begin broadcasting" : "Ready to start streaming"}</p>
                                        </div>
                                        {/* Only show Start button when stream is scheduled */}
                                        {isStreamScheduled && (
                                            <Button onClick={handleStartStream} className="gap-2 bg-white text-black hover:bg-gray-200 shadow-lg" disabled={isStartingStream}>
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
                                    <p className="text-xs text-muted-foreground">{isStreamLive ? "Interact with your audience in real-time" : isStreamScheduled ? "Chat will be available when stream starts" : isStreamEnded ? "Chat is now read-only" : isStreamStarting ? "Chat will be available when stream starts" : "Chat not available"}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm font-medium">{onlineUsers}</span>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[500px]">
                                {isLoadingMessages ? (
                                    <div className="flex justify-center items-center h-20">
                                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                        <div className="text-muted-foreground space-y-1">
                                            <p className="text-sm font-medium">{isStreamLive ? "No messages yet" : isStreamScheduled ? "Start stream to enable chat" : "Chat not available"}</p>
                                            <p className="text-xs">{isStreamLive ? "Be the first to send a message!" : isStreamScheduled ? "Chat will appear here" : "Chat is disabled"}</p>
                                        </div>
                                    </div>
                                ) : (
                                    messages.map((msg: ChatMessage) => (
                                        <div key={msg.id} className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-6 h-6 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">{msg.userProfile?.name?.charAt(0) || "U"}</div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-semibold text-foreground text-sm">{msg.userProfile?.name || "User"}</span>
                                                    <span className="text-xs text-muted-foreground">{formatTime(msg.createdAt)}</span>
                                                </div>
                                            </div>
                                            <div className="ml-8 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700">
                                                <p className="text-foreground text-sm leading-relaxed">{msg.message}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-4 border-t border-border">
                                <div className="flex items-center gap-2">
                                    <Input
                                        placeholder={isStreamLive ? "Type a message..." : isStreamScheduled ? "Start stream to enable chat" : isStreamEnded ? "Chat is now read-only" : isStreamStarting ? "Stream is starting..." : "Chat not available"}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        className="flex-1 bg-background"
                                        disabled={!isStreamLive || isSendingMessage}
                                    />
                                    <Button onClick={handleSendMessage} size="sm" className="gap-2 bg-foreground text-background hover:opacity-90 shrink-0" disabled={!inputValue.trim() || !isStreamLive || isSendingMessage}>
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
