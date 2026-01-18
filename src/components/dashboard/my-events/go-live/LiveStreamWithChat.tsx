// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Volume2, Settings, Play, Send, Users, Fullscreen, Minimize2 } from "lucide-react";

// export default function LiveStreamWithChat() {
//     const [messages, setMessages] = useState([]);
//     const [isStreamActive, setIsStreamActive] = useState(false);
//     const [inputValue, setInputValue] = useState("");

//     const handleSendMessage = (text) => {
//         if (text.trim()) {
//             setMessages([...messages, { id: Date.now().toString(), text }]);
//         }
//     };

//     const handleSend = () => {
//         handleSendMessage(inputValue);
//         setInputValue("");
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault();
//             handleSend();
//         }
//     };

//     // Full Screen Button
//     const [isFullscreen, setIsFullscreen] = useState(false);
//     const videoContainerRef = useRef(null);

//     const toggleFullscreen = () => {
//         if (!document.fullscreenElement) {
//             if (videoContainerRef.current?.requestFullscreen) {
//                 videoContainerRef.current.requestFullscreen();
//             } else if (videoContainerRef.current?.webkitRequestFullscreen) {
//                 videoContainerRef.current.webkitRequestFullscreen(); // Safari
//             } else if (videoContainerRef.current?.msRequestFullscreen) {
//                 videoContainerRef.current.msRequestFullscreen(); // IE/Edge
//             }
//         } else {
//             if (document.exitFullscreen) {
//                 document.exitFullscreen();
//             } else if (document.webkitExitFullscreen) {
//                 document.webkitExitFullscreen(); // Safari
//             } else if (document.msExitFullscreen) {
//                 document.msExitFullscreen(); // IE/Edge
//             }
//         }
//     };

//     // Listen for fullscreen change events
//     useEffect(() => {
//         const handleFullscreenChange = () => {
//             setIsFullscreen(!!document.fullscreenElement);
//         };

//         document.addEventListener("fullscreenchange", handleFullscreenChange);
//         document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
//         document.addEventListener("msfullscreenchange", handleFullscreenChange);

//         return () => {
//             document.removeEventListener("fullscreenchange", handleFullscreenChange);
//             document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
//             document.removeEventListener("msfullscreenchange", handleFullscreenChange);
//         };
//     }, []);

//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Live Stream Section - 2/3 width on large screens */}
//             <div className="lg:col-span-2">
//                 <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                         <h2 className="text-lg font-semibold">Live Stream</h2>
//                         <div className="flex items-center gap-2">
//                             <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
//                                 <Volume2 className="w-4 h-4" />
//                             </Button>
//                             <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
//                                 <Settings className="w-4 h-4" />
//                             </Button>
//                             <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
//                                 {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Fullscreen className="w-4 h-4" />}
//                             </Button>
//                         </div>
//                     </div>

//                     <div ref={videoContainerRef} className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
//                         {!isStreamActive ? (
//                             <div className="text-center text-white space-y-4">
//                                 <Play className="w-16 h-16 mx-auto opacity-50" strokeWidth={1} />
//                                 <div>
//                                     <p className="text-lg font-semibold">Stream Not Active</p>
//                                     <p className="text-sm text-gray-400">Start the stream to broadcast your event</p>
//                                 </div>
//                                 <Button onClick={() => setIsStreamActive(true)} className="gap-2 bg-white text-black hover:bg-gray-200">
//                                     <Play className="w-4 h-4" />
//                                     Start Live Stream
//                                 </Button>
//                             </div>
//                         ) : (
//                             <div className="w-full h-full bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center">
//                                 <div className="text-white text-center">
//                                     <div className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
//                                     <span>Live</span>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Chat Section - 1/3 width on large screens */}
//             <div className="lg:col-span-1">
//                 <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
//                     <div className="flex items-center justify-between p-4 border-b border-border">
//                         <div>
//                             <h2 className="text-lg font-semibold">Live Chat</h2>
//                             <p className="text-xs text-muted-foreground">Interact with your audience in real-time</p>
//                         </div>
//                         <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
//                             <Users className="w-4 h-4" />
//                             <span className="ml-1 text-xs">0</span>
//                         </Button>
//                     </div>

//                     <div className="flex-1 overflow-y-auto p-4 space-y-3">
//                         {messages.length === 0 ? (
//                             <div className="flex flex-col items-center justify-center h-full text-center">
//                                 <div className="text-muted-foreground space-y-1">
//                                     <p className="text-sm font-medium">No comments yet</p>
//                                     <p className="text-xs">Comments will appear here in real-time</p>
//                                 </div>
//                             </div>
//                         ) : (
//                             messages.map((msg) => (
//                                 <div key={msg.id} className="text-sm bg-muted rounded p-2">
//                                     {msg.text}
//                                 </div>
//                             ))
//                         )}
//                     </div>

//                     <div className="p-4 border-t border-border">
//                         <div className="flex items-center gap-2">
//                             <Input placeholder="Type a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} className="flex-1 bg-background" />
//                             <Button onClick={handleSend} size="sm" className="gap-2 bg-foreground text-background hover:opacity-90 shrink-0">
//                                 <Send className="w-4 h-4" />
//                                 <span className="hidden sm:inline">Send</span>
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Volume2, Settings, Play, Send, Users, Fullscreen, Minimize2 } from "lucide-react";

interface Message {
    id: string;
    text: string;
}

export default function LiveStreamWithChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isStreamActive, setIsStreamActive] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const videoContainerRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = (text: string) => {
        if (text.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text,
            };
            setMessages((prev) => [...prev, newMessage]);
        }
    };

    const handleSend = () => {
        handleSendMessage(inputValue);
        setInputValue("");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            const element = videoContainerRef.current;
            if (element) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if ((element as any).webkitRequestFullscreen) {
                    // Safari
                    (element as any).webkitRequestFullscreen();
                } else if ((element as any).msRequestFullscreen) {
                    // IE/Edge
                    (element as any).msRequestFullscreen();
                }
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                // Safari
                (document as any).webkitExitFullscreen();
            } else if ((document as any).msExitFullscreen) {
                // IE/Edge
                (document as any).msExitFullscreen();
            }
        }
    };

    // Listen for fullscreen change events
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange as EventListener);
        document.addEventListener("msfullscreenchange", handleFullscreenChange as EventListener);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange as EventListener);
            document.removeEventListener("msfullscreenchange", handleFullscreenChange as EventListener);
        };
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Stream Section - 2/3 width on large screens */}
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
                        {!isStreamActive ? (
                            <div className="text-center text-white space-y-4">
                                <Play className="w-16 h-16 mx-auto opacity-50" strokeWidth={1} />
                                <div>
                                    <p className="text-lg font-semibold">Stream Not Active</p>
                                    <p className="text-sm text-gray-400">Start the stream to broadcast your event</p>
                                </div>
                                <Button onClick={() => setIsStreamActive(true)} className="gap-2 bg-white text-black hover:bg-gray-200">
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
            </div>

            {/* Chat Section - 1/3 width on large screens */}
            <div className="lg:col-span-1">
                <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden justify-between">
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <div>
                            <h2 className="text-lg font-semibold">Live Chat</h2>
                            <p className="text-xs text-muted-foreground">Interact with your audience in real-time</p>
                        </div>
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                            <Users className="w-4 h-4" />
                            <span className="ml-1 text-xs">0</span>
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[400px]">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="text-muted-foreground space-y-1">
                                    <p className="text-sm font-medium">No comments yet</p>
                                    <p className="text-xs">Comments will appear here in real-time</p>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div key={msg.id} className="text-sm bg-muted rounded p-2">
                                    {msg.text}
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-4 border-t border-border">
                        <div className="flex items-center gap-2">
                            <Input placeholder="Type a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyPress} className="flex-1 bg-background" />
                            <Button onClick={handleSend} size="sm" className="gap-2 bg-foreground text-background hover:opacity-90 shrink-0">
                                <Send className="w-4 h-4" />
                                <span className="hidden sm:inline">Send</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
