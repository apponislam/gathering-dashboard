// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Volume2, Settings, Play, Fullscreen, Minimize2, EyeOff, Mic, MicOff, Square, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import AgoraRTC from "agora-rtc-sdk-ng";
// import type { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
// import { useEndLivestreamMutation, useStartLivestreamMutation } from "@/redux/features/stream/streamApi";

// interface LivePlayerProps {
//     isStreamActive: boolean;
//     onStreamToggle: (active: boolean) => void;
//     streamId?: string | null;
// }

// const LivePlayer = ({ isStreamActive, onStreamToggle, streamId }: LivePlayerProps) => {
//     const [isFullscreen, setIsFullscreen] = useState(false);
//     const [isVideoEnabled, setIsVideoEnabled] = useState(true);
//     const [isAudioEnabled, setIsAudioEnabled] = useState(true);
//     const [isLoading, setIsLoading] = useState(false);

//     // RTK Mutations
//     const [startLivestream] = useStartLivestreamMutation();
//     const [endLivestream] = useEndLivestreamMutation();

//     const videoContainerRef = useRef<HTMLDivElement>(null);
//     const localVideoTrackRef = useRef<ICameraVideoTrack | null>(null);
//     const localAudioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);

//     // Toggle fullscreen
//     const toggleFullscreen = () => {
//         if (!document.fullscreenElement) {
//             const element = videoContainerRef.current;
//             if (element) {
//                 element.requestFullscreen().catch(console.error);
//             }
//         } else {
//             document.exitFullscreen().catch(console.error);
//         }
//     };

//     // Listen for fullscreen change events
//     useEffect(() => {
//         const handleFullscreenChange = () => {
//             setIsFullscreen(!!document.fullscreenElement);
//         };

//         document.addEventListener("fullscreenchange", handleFullscreenChange);
//         return () => {
//             document.removeEventListener("fullscreenchange", handleFullscreenChange);
//         };
//     }, []);

//     // Start broadcasting
//     const startBroadcast = async () => {
//         if (!streamId) {
//             toast.error("Please create a stream first");
//             return;
//         }

//         setIsLoading(true);
//         try {
//             // Start stream on backend
//             const response = await startLivestream(streamId).unwrap();

//             if (response.success) {
//                 // Setup camera and microphone
//                 await setupLocalMedia();
//                 onStreamToggle(true);
//                 toast.success("Live stream started!");
//             }
//         } catch (error: any) {
//             console.error("Error starting broadcast:", error);
//             toast.error(error?.data?.message || "Failed to start stream");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Setup local media
//     const setupLocalMedia = async () => {
//         try {
//             // Clean up existing tracks
//             if (localVideoTrackRef.current) {
//                 localVideoTrackRef.current.stop();
//                 localVideoTrackRef.current.close();
//             }
//             if (localAudioTrackRef.current) {
//                 localAudioTrackRef.current.stop();
//                 localAudioTrackRef.current.close();
//             }

//             // Get camera access
//             const cameraTrack = await AgoraRTC.createCameraVideoTrack();
//             const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();

//             localVideoTrackRef.current = cameraTrack;
//             localAudioTrackRef.current = microphoneTrack;

//             // Play local video
//             if (videoContainerRef.current) {
//                 videoContainerRef.current.innerHTML = "";
//                 const videoElement = document.createElement("div");
//                 videoElement.className = "w-full h-full";
//                 videoContainerRef.current.appendChild(videoElement);
//                 cameraTrack.play(videoElement);
//             }

//             setIsVideoEnabled(true);
//             setIsAudioEnabled(true);
//         } catch (error: any) {
//             console.error("Error accessing media:", error);

//             if (error.name === "NotAllowedError") {
//                 toast.error("Please allow camera and microphone access");
//             } else if (error.name === "NotFoundError") {
//                 toast.error("No camera or microphone found");
//             } else {
//                 toast.error("Failed to access media devices");
//             }
//             throw error;
//         }
//     };

//     // Stop broadcasting
//     const stopBroadcast = async () => {
//         if (!streamId) return;

//         setIsLoading(true);
//         try {
//             // Stop local tracks
//             if (localVideoTrackRef.current) {
//                 localVideoTrackRef.current.stop();
//                 localVideoTrackRef.current.close();
//                 localVideoTrackRef.current = null;
//             }
//             if (localAudioTrackRef.current) {
//                 localAudioTrackRef.current.stop();
//                 localAudioTrackRef.current.close();
//                 localAudioTrackRef.current = null;
//             }

//             // End stream on backend
//             const response = await endLivestream(streamId).unwrap();

//             if (response.success) {
//                 onStreamToggle(false);
//                 toast.success("Stream ended");

//                 // Clear video container
//                 if (videoContainerRef.current) {
//                     videoContainerRef.current.innerHTML = "";
//                 }
//             }
//         } catch (error: any) {
//             console.error("Error stopping broadcast:", error);
//             toast.error(error?.data?.message || "Failed to stop stream");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Toggle video
//     const toggleVideo = async () => {
//         if (localVideoTrackRef.current) {
//             try {
//                 await localVideoTrackRef.current.setEnabled(!isVideoEnabled);
//                 setIsVideoEnabled(!isVideoEnabled);
//                 toast.info(isVideoEnabled ? "Video turned off" : "Video turned on");
//             } catch (error) {
//                 console.error("Error toggling video:", error);
//             }
//         }
//     };

//     // Toggle audio
//     const toggleAudio = async () => {
//         if (localAudioTrackRef.current) {
//             try {
//                 await localAudioTrackRef.current.setEnabled(!isAudioEnabled);
//                 setIsAudioEnabled(!isAudioEnabled);
//                 toast.info(isAudioEnabled ? "Microphone muted" : "Microphone unmuted");
//             } catch (error) {
//                 console.error("Error toggling audio:", error);
//             }
//         }
//     };

//     // Cleanup on unmount
//     useEffect(() => {
//         return () => {
//             if (localVideoTrackRef.current) {
//                 localVideoTrackRef.current.stop();
//                 localVideoTrackRef.current.close();
//             }
//             if (localAudioTrackRef.current) {
//                 localAudioTrackRef.current.stop();
//                 localAudioTrackRef.current.close();
//             }
//         };
//     }, []);

//     return (
//         <div className="space-y-4 h-full flex flex-col">
//             <div className="flex items-center justify-between">
//                 <h2 className="text-lg font-semibold">Live Stream</h2>
//                 <div className="flex items-center gap-2">
//                     <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
//                         <Volume2 className="w-4 h-4" />
//                     </Button>
//                     <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
//                         <Settings className="w-4 h-4" />
//                     </Button>
//                     <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
//                         {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Fullscreen className="w-4 h-4" />}
//                     </Button>
//                 </div>
//             </div>

//             <div ref={videoContainerRef} className="relative bg-black rounded-lg overflow-hidden flex-1 flex items-center justify-center">
//                 {!isStreamActive ? (
//                     <div className="text-center text-white space-y-4">
//                         <Play className="w-16 h-16 mx-auto opacity-50" strokeWidth={1} />
//                         <div>
//                             <p className="text-lg font-semibold">Stream Not Active</p>
//                             <p className="text-sm text-gray-400">{streamId ? "Start the stream to broadcast" : "Create a stream first"}</p>
//                         </div>
//                         <Button onClick={startBroadcast} className="gap-2 bg-white text-black hover:bg-gray-200" disabled={isLoading || !streamId}>
//                             {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
//                             Start Live Stream
//                         </Button>
//                     </div>
//                 ) : (
//                     <>
//                         <div className="absolute top-4 left-4 z-10">
//                             <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
//                                 <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//                                 <span className="text-xs font-semibold">LIVE</span>
//                             </div>
//                         </div>

//                         <div className="absolute bottom-4 right-4 z-10 flex gap-2">
//                             <Button variant={isVideoEnabled ? "secondary" : "destructive"} size="icon" className="rounded-full w-10 h-10" onClick={toggleVideo}>
//                                 {isVideoEnabled ? <EyeOff className="h-4 w-4" /> : <Play className="h-4 w-4" />}
//                             </Button>
//                             <Button variant={isAudioEnabled ? "secondary" : "destructive"} size="icon" className="rounded-full w-10 h-10" onClick={toggleAudio}>
//                                 {isAudioEnabled ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
//                             </Button>
//                             <Button variant="destructive" size="icon" className="rounded-full w-10 h-10" onClick={stopBroadcast} disabled={isLoading}>
//                                 {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Square className="h-4 w-4" />}
//                             </Button>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default LivePlayer;

// components/broadcast/LivePlayer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Settings, Play, Fullscreen, Minimize2, EyeOff, Mic, MicOff, Square, Loader2 } from "lucide-react";
import { toast } from "sonner";
import AgoraRTC from "agora-rtc-sdk-ng";
import type { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { useEndLivestreamMutation, useStartLivestreamMutation } from "@/redux/features/stream/streamApi";

interface LivePlayerProps {
    streamId: string;
    isStreamActive: boolean;
    onStreamActiveChange: (active: boolean) => void;
}

const LivePlayer = ({ streamId, isStreamActive, onStreamActiveChange }: LivePlayerProps) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // RTK Mutations
    const [startLivestream] = useStartLivestreamMutation();
    const [endLivestream] = useEndLivestreamMutation();

    const videoContainerRef = useRef<HTMLDivElement>(null);
    const localVideoTrackRef = useRef<ICameraVideoTrack | null>(null);
    const localAudioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);

    // Toggle fullscreen
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

    // Go Live button
    const handleGoLive = async () => {
        setIsLoading(true);
        try {
            const result = await startLivestream(streamId).unwrap();

            if (result.success) {
                await setupLocalMedia();
                onStreamActiveChange(true);
                toast.success("Stream started!");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to start stream");
        } finally {
            setIsLoading(false);
        }
    };

    // Setup local media
    const setupLocalMedia = async () => {
        try {
            // Clean up existing tracks
            if (localVideoTrackRef.current) {
                localVideoTrackRef.current.stop();
                localVideoTrackRef.current.close();
            }
            if (localAudioTrackRef.current) {
                localAudioTrackRef.current.stop();
                localAudioTrackRef.current.close();
            }

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
            throw error;
        }
    };

    // Stop stream
    const handleStopStream = async () => {
        setIsLoading(true);
        try {
            const result = await endLivestream(streamId).unwrap();

            if (result.success) {
                // Stop local tracks
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

                onStreamActiveChange(false);
                toast.success("Stream ended");

                // Clear video container
                if (videoContainerRef.current) {
                    videoContainerRef.current.innerHTML = "";
                }
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to stop stream");
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle video/audio
    const toggleVideo = async () => {
        if (localVideoTrackRef.current) {
            try {
                await localVideoTrackRef.current.setEnabled(!isVideoEnabled);
                setIsVideoEnabled(!isVideoEnabled);
            } catch (error) {
                console.error("Error toggling video:", error);
            }
        }
    };

    const toggleAudio = async () => {
        if (localAudioTrackRef.current) {
            try {
                await localAudioTrackRef.current.setEnabled(!isAudioEnabled);
                setIsAudioEnabled(!isAudioEnabled);
            } catch (error) {
                console.error("Error toggling audio:", error);
            }
        }
    };

    // Cleanup
    useEffect(() => {
        return () => {
            if (localVideoTrackRef.current) {
                localVideoTrackRef.current.stop();
                localVideoTrackRef.current.close();
            }
            if (localAudioTrackRef.current) {
                localAudioTrackRef.current.stop();
                localAudioTrackRef.current.close();
            }
        };
    }, []);

    return (
        <div className="space-y-4 h-full flex flex-col">
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

            <div ref={videoContainerRef} className="relative bg-black rounded-lg overflow-hidden flex-1 flex items-center justify-center">
                {!isStreamActive ? (
                    <div className="text-center text-white space-y-6">
                        <Play className="w-20 h-20 mx-auto opacity-30" strokeWidth={1} />
                        <div className="space-y-2">
                            <p className="text-xl font-semibold">Ready to Go Live?</p>
                            <p className="text-sm text-gray-400 max-w-md">Click the button below to start broadcasting to your audience</p>
                        </div>
                        <Button onClick={handleGoLive} className="gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Starting...
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5" />
                                    Go Live
                                </>
                            )}
                        </Button>
                    </div>
                ) : (
                    <>
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
                            <Button variant="destructive" size="icon" className="rounded-full w-10 h-10" onClick={handleStopStream} disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Square className="h-4 w-4" />}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LivePlayer;
