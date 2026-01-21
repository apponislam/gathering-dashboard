// // components/broadcast/LiveChat.tsx
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Send, Users } from "lucide-react";

// interface Message {
//     id: string;
//     text: string;
//     userId: string;
//     userName: string;
//     timestamp: Date;
// }

// interface LiveChatProps {
//     streamId?: string | null;
//     isConnected: boolean;
// }

// const LiveChat = ({ streamId, isConnected }: LiveChatProps) => {
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [inputValue, setInputValue] = useState("");
//     const [onlineUsers, setOnlineUsers] = useState(0);
//     const chatContainerRef = useRef<HTMLDivElement>(null);

//     const handleSendMessage = () => {
//         if (!inputValue.trim() || !isConnected) return;

//         const newMessage: Message = {
//             id: Date.now().toString(),
//             text: inputValue,
//             userId: "current-user",
//             userName: "You",
//             timestamp: new Date(),
//         };

//         setMessages((prev) => [...prev, newMessage]);
//         setInputValue("");

//         // Simulate receiving messages (in real app, this would be via WebSocket)
//         setTimeout(() => {
//             const botMessage: Message = {
//                 id: (Date.now() + 1).toString(),
//                 text: "Thanks for your message!",
//                 userId: "bot",
//                 userName: "Event Bot",
//                 timestamp: new Date(),
//             };
//             setMessages((prev) => [...prev, botMessage]);
//         }, 1000);
//     };

//     const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault();
//             handleSendMessage();
//         }
//     };

//     // Scroll to bottom when messages change
//     useEffect(() => {
//         if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//         }
//     }, [messages]);

//     // Simulate online users
//     useEffect(() => {
//         if (isConnected) {
//             const interval = setInterval(() => {
//                 setOnlineUsers((prev) => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
//             }, 5000);

//             return () => clearInterval(interval);
//         } else {
//             setOnlineUsers(0);
//         }
//     }, [isConnected]);

//     return (
//         <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
//             <div className="flex items-center justify-between p-4 border-b border-border">
//                 <div>
//                     <h2 className="text-lg font-semibold">Live Chat</h2>
//                     <p className="text-xs text-muted-foreground">{isConnected ? "Interact with your audience in real-time" : "Chat will be available when stream starts"}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <Users className="w-4 h-4" />
//                     <span className="text-sm font-medium">{onlineUsers}</span>
//                 </div>
//             </div>

//             <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
//                 {messages.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center h-full text-center">
//                         <div className="text-muted-foreground space-y-1">
//                             <p className="text-sm font-medium">{isConnected ? "No messages yet" : "Start streaming to enable chat"}</p>
//                             <p className="text-xs">{isConnected ? "Be the first to send a message!" : "Chat will appear here"}</p>
//                         </div>
//                     </div>
//                 ) : (
//                     messages.map((msg) => (
//                         <div key={msg.id} className={`text-sm rounded-lg p-3 ${msg.userId === "current-user" ? "bg-primary/10 ml-8" : "bg-muted mr-8"}`}>
//                             <div className="flex items-center justify-between mb-1">
//                                 <span className={`font-medium ${msg.userId === "current-user" ? "text-primary" : "text-foreground"}`}>{msg.userName}</span>
//                                 <span className="text-xs text-muted-foreground">{msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
//                             </div>
//                             <p className="text-foreground">{msg.text}</p>
//                         </div>
//                     ))
//                 )}
//             </div>

//             <div className="p-4 border-t border-border">
//                 <div className="flex items-center gap-2">
//                     <Input placeholder={isConnected ? "Type a message..." : "Start stream to enable chat"} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyPress} className="flex-1" disabled={!isConnected} />
//                     <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim() || !isConnected} className="shrink-0">
//                         <Send className="w-4 h-4" />
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LiveChat;

// components/broadcast/LiveChat.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ChatMessage, useGetChatMessagesQuery, useGetChatParticipantsQuery, useSendMessageMutation } from "@/redux/features/streamChat/streamChatApi";

interface LiveChatProps {
    streamId?: string | null;
    isConnected: boolean;
}

const LiveChat = ({ streamId, isConnected }: LiveChatProps) => {
    const [inputValue, setInputValue] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // RTK Queries
    const { data: messagesData, isLoading: isLoadingMessages, refetch: refetchMessages } = useGetChatMessagesQuery({ streamId: streamId!, limit: 50 }, { skip: !streamId || !isConnected });

    const { data: participantsData } = useGetChatParticipantsQuery(streamId!, { skip: !streamId || !isConnected });

    const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

    const messages = messagesData?.data || [];
    // const participants = participantsData?.data?.participants || [];
    const onlineUsers = participantsData?.data?.total || 0;

    // Scroll to bottom when messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Auto-refresh messages when connected
    useEffect(() => {
        if (isConnected && streamId) {
            const interval = setInterval(() => {
                refetchMessages();
            }, 3000); // Refresh every 3 seconds

            return () => clearInterval(interval);
        }
    }, [isConnected, streamId, refetchMessages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || !isConnected || !streamId) return;

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

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div>
                    <h2 className="text-lg font-semibold">Live Chat</h2>
                    <p className="text-xs text-muted-foreground">{isConnected ? "Interact with your audience in real-time" : "Chat will be available when stream starts"}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">{onlineUsers}</span>
                </div>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {isLoadingMessages ? (
                    <div className="flex justify-center items-center h-20">
                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="text-muted-foreground space-y-1">
                            <p className="text-sm font-medium">{isConnected ? "No messages yet" : "Start streaming to enable chat"}</p>
                            <p className="text-xs">{isConnected ? "Be the first to send a message!" : "Chat will appear here"}</p>
                        </div>
                    </div>
                ) : (
                    messages.map((msg: ChatMessage) => (
                        <div key={msg.id} className={`text-sm rounded-lg p-3 ${msg.userId === "current-user" ? "bg-primary/10 ml-8" : "bg-muted mr-8"}`}>
                            <div className="flex items-center justify-between mb-1">
                                <span className={`font-medium ${msg.userId === "current-user" ? "text-primary" : "text-foreground"}`}>{msg.userProfile?.name || "User"}</span>
                                <span className="text-xs text-muted-foreground">{formatTime(msg.createdAt)}</span>
                            </div>
                            <p className="text-foreground">{msg.message}</p>
                        </div>
                    ))
                )}
            </div>

            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                    <Input placeholder={isConnected ? "Type a message..." : "Start stream to enable chat"} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyPress} className="flex-1" disabled={!isConnected || isSendingMessage} />
                    <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim() || !isConnected || isSendingMessage} className="shrink-0">
                        {isSendingMessage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LiveChat;
