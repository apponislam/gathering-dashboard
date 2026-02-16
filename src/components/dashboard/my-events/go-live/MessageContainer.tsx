// "use client";

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { useParams } from "next/navigation";
// import { useGetChatMessagesQuery, useSendMessageMutation, useToggleMessageLikeMutation, useDeleteMessageMutation, useGetChatParticipantsQuery } from "@/redux/features/streamChat/streamChatApi";
// import { useGetUserProfileQuery } from "@/redux/features/user/userApi";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Send, Users, Heart, Trash2, Loader2, MessageCircle } from "lucide-react";
// import { toast } from "sonner";
// import io, { Socket } from "socket.io-client";
// import Image from "next/image";

// let socket: Socket | null = null;

// interface ChatMessage {
//     id: string;
//     userId: string;
//     userProfile: {
//         name: string;
//         avatar?: string;
//     };
//     message: string;
//     messageType: "text" | "emoji" | "system";
//     formattedTime: string;
//     likes: number;
//     hasLiked: boolean;
//     createdAt: string;
// }

// const MessageContainer = () => {
//     const { id: roomId } = useParams();
//     const [inputValue, setInputValue] = useState("");
//     const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]);
//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     const hasScrolledInitial = useRef(false);
//     const messageIds = useRef<Set<string>>(new Set());

//     // Get current user
//     const { data: userData } = useGetUserProfileQuery();
//     const currentUserId = userData?.data?.id || userData?.data?._id || "";

//     // API Queries
//     const { data: initialMessagesData, isLoading: isLoadingMessages } = useGetChatMessagesQuery({ roomId: roomId as string, limit: 50 }, { skip: !roomId });

//     const { data: participantsData } = useGetChatParticipantsQuery(roomId as string, { skip: !roomId, pollingInterval: 30000 });

//     const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();
//     const [toggleLike] = useToggleMessageLikeMutation();
//     const [deleteMessage] = useDeleteMessageMutation();

//     const onlineUsers = participantsData?.data?.total || 0;
//     const baseUrl = process.env.NEXT_PUBLIC_BASEURL?.replace("/api/v1", "") || "http://10.10.7.50:4006";

//     // Initialize message IDs from API
//     useEffect(() => {
//         if (initialMessagesData?.data) {
//             initialMessagesData.data.forEach((msg: ChatMessage) => {
//                 messageIds.current.add(msg.id);
//             });
//         }
//     }, [initialMessagesData]);

//     // Combine initial messages with live messages
//     const allMessages = [...(initialMessagesData?.data || []), ...liveMessages];

//     // Scroll to bottom function
//     const scrollToBottom = useCallback(() => {
//         setTimeout(() => {
//             messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//         }, 100);
//     }, []);

//     // Scroll to bottom on initial load
//     useEffect(() => {
//         if (initialMessagesData?.data && !hasScrolledInitial.current) {
//             hasScrolledInitial.current = true;
//             scrollToBottom();
//         }
//     }, [initialMessagesData, scrollToBottom]);

//     // Socket connection
//     useEffect(() => {
//         if (!roomId) return;

//         const socketUrl = process.env.NEXT_PUBLIC_BASEURL;
//         socket = io(socketUrl, {
//             auth: { token: localStorage.getItem("accessToken") },
//         });

//         socket.emit("join-room", roomId);

//         socket.on("new-message", (newMessage: ChatMessage) => {
//             // Prevent duplicates
//             if (!messageIds.current.has(newMessage.id)) {
//                 messageIds.current.add(newMessage.id);
//                 setLiveMessages((prev) => [...prev, newMessage]);
//                 scrollToBottom();
//             }
//         });

//         socket.on("message-liked", ({ messageId }: { messageId: string }) => {
//             // Update in both places
//             setLiveMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, hasLiked: !msg.hasLiked, likes: msg.hasLiked ? msg.likes - 1 : msg.likes + 1 } : msg)));
//         });

//         socket.on("message-deleted", ({ messageId }: { messageId: string }) => {
//             setLiveMessages((prev) => prev.filter((msg) => msg.id !== messageId));
//             messageIds.current.delete(messageId);
//         });

//         return () => {
//             if (socket) {
//                 socket.emit("leave-room", roomId);
//                 socket.disconnect();
//             }
//             setLiveMessages([]);
//         };
//     }, [roomId, scrollToBottom]);

//     const handleSendMessage = async () => {
//         if (!inputValue.trim() || !roomId) return;

//         const messageText = inputValue.trim();
//         setInputValue("");

//         try {
//             await sendMessage({
//                 roomId: roomId as string,
//                 message: messageText,
//                 messageType: "text",
//             }).unwrap();
//         } catch (error: any) {
//             toast.error(error?.data?.message || "Failed to send message");
//             setInputValue(messageText);
//         }
//     };

//     const handleLike = async (messageId: string) => {
//         try {
//             await toggleLike({ messageId }).unwrap();
//         } catch (error: any) {
//             toast.error(error?.data?.message || "Failed to like message");
//         }
//     };

//     const handleDelete = async (messageId: string) => {
//         try {
//             await deleteMessage({ messageId }).unwrap();
//             toast.success("Message deleted");
//         } catch (error: any) {
//             toast.error(error?.data?.message || "Failed to delete message");
//         }
//     };

//     const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault();
//             handleSendMessage();
//         }
//     };

//     const formatTime = (timestamp: string) => {
//         return new Date(timestamp).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//         });
//     };

//     const getAvatarUrl = (avatarPath?: string) => {
//         if (!avatarPath) return null;
//         if (avatarPath.startsWith("http")) return avatarPath;
//         return `${baseUrl}${avatarPath}`;
//     };

//     if (!roomId) {
//         return (
//             <div className="flex flex-col items-center justify-center h-[600px] bg-card border border-border rounded-lg">
//                 <MessageCircle className="w-16 h-16 text-muted-foreground mb-4" />
//                 <p className="text-lg font-semibold">No Chat Room</p>
//                 <p className="text-sm text-muted-foreground">Chat is not available</p>
//             </div>
//         );
//     }

//     return (
//         <div className="flex flex-col h-[600px] bg-card border border-border rounded-lg overflow-hidden">
//             {/* Header */}
//             <div className="flex items-center justify-between p-4 border-b border-border">
//                 <div className="flex items-center gap-2">
//                     <MessageCircle className="w-5 h-5" />
//                     <h2 className="font-semibold">Live Chat</h2>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <Users className="w-4 h-4" />
//                     <span className="text-sm">{onlineUsers}</span>
//                 </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {isLoadingMessages ? (
//                     <div className="flex justify-center items-center h-full">
//                         <Loader2 className="w-6 h-6 animate-spin" />
//                     </div>
//                 ) : allMessages.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center h-full text-center">
//                         <p className="text-sm text-muted-foreground">No messages yet</p>
//                         <p className="text-xs text-muted-foreground">Be the first to say something!</p>
//                     </div>
//                 ) : (
//                     allMessages.map((msg) => {
//                         const isOwnMessage = msg.userId === currentUserId;
//                         const avatarUrl = getAvatarUrl(msg.userProfile?.avatar);

//                         return (
//                             <div key={msg.id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
//                                 <div className={`max-w-[80%] ${isOwnMessage ? "order-2" : "order-1"}`}>
//                                     {!isOwnMessage && (
//                                         <div className="flex items-center gap-2 mb-1 ml-2">
//                                             {avatarUrl ? (
//                                                 <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200">
//                                                     <Image src={avatarUrl} alt={msg.userProfile?.name || "User"} width={20} height={20} className="object-cover w-full h-full" unoptimized />
//                                                 </div>
//                                             ) : (
//                                                 <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] font-medium text-white">{msg.userProfile?.name?.charAt(0)?.toUpperCase() || "U"}</div>
//                                             )}
//                                             <p className="text-xs font-medium text-foreground">{msg.userProfile?.name || "User"}</p>
//                                         </div>
//                                     )}
//                                     <div className={`flex items-start gap-1 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
//                                         {/* Message bubble */}
//                                         <div className={`rounded-2xl px-3 py-2 ${isOwnMessage ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 dark:bg-gray-800 rounded-bl-none"}`}>
//                                             <p className="text-sm break-words">{msg.message}</p>
//                                             <div className={`flex items-center justify-end gap-2 mt-1 text-[10px] ${isOwnMessage ? "text-blue-100" : "text-gray-500"}`}>
//                                                 <span>{formatTime(msg.createdAt)}</span>
//                                                 {msg.likes > 0 && <span>❤️ {msg.likes}</span>}
//                                             </div>
//                                         </div>

//                                         {/* Actions */}
//                                         <div className="flex items-center gap-0.5">
//                                             <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-transparent" onClick={() => handleLike(msg.id)}>
//                                                 <Heart className={`h-3 w-3 ${msg.hasLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
//                                             </Button>

//                                             {isOwnMessage && (
//                                                 <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-transparent" onClick={() => handleDelete(msg.id)}>
//                                                     <Trash2 className="h-3 w-3 text-gray-400" />
//                                                 </Button>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })
//                 )}
//                 <div ref={messagesEndRef} />
//             </div>

//             {/* Input */}
//             <div className="p-4 border-t border-border">
//                 <div className="flex gap-2">
//                     <Input placeholder="Type a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyPress} disabled={isSendingMessage} className="flex-1" />
//                     <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim() || isSendingMessage} className="bg-blue-600 hover:bg-blue-700 text-white">
//                         {isSendingMessage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MessageContainer;

// components/MessageContainer.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useGetChatMessagesQuery, useSendMessageMutation, useToggleMessageLikeMutation, useDeleteMessageMutation, useGetChatParticipantsQuery } from "@/redux/features/streamChat/streamChatApi";
import { useGetUserProfileQuery } from "@/redux/features/user/userApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Users, Heart, Trash2, Loader2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import io, { Socket } from "socket.io-client";
import Image from "next/image";

let socket: Socket | null = null;

interface ChatMessage {
    id: string;
    userId: string;
    userProfile: {
        name: string;
        avatar?: string;
    };
    message: string;
    messageType: "text" | "emoji" | "system";
    formattedTime: string;
    likes: number;
    hasLiked: boolean;
    createdAt: string;
}

const MessageContainer = () => {
    const { id: roomId } = useParams();
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]); // Single source of truth
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageIds = useRef<Set<string>>(new Set()); // Track all message IDs to prevent duplicates

    // Get current user
    const { data: userData } = useGetUserProfileQuery();
    const currentUserId = userData?.data?.id || userData?.data?._id || "";

    // API Queries
    const { data: initialMessagesData, isLoading: isLoadingMessages } = useGetChatMessagesQuery({ roomId: roomId as string, limit: 50 }, { skip: !roomId });

    const { data: participantsData } = useGetChatParticipantsQuery(roomId as string, { skip: !roomId, pollingInterval: 30000 });

    const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();
    const [toggleLike] = useToggleMessageLikeMutation();
    const [deleteMessage] = useDeleteMessageMutation();

    const onlineUsers = participantsData?.data?.total || 0;
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL?.replace("/api/v1", "") || "http://10.10.7.50:4006";

    // Define scrollToBottom first
    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, []);

    // Load initial messages - ONLY ONCE and only if we don't have messages yet
    useEffect(() => {
        if (initialMessagesData?.data && messages.length === 0) {
            // Filter out any messages that might already be in the set (shouldn't happen on initial load)
            const newMessages = initialMessagesData.data.filter((msg: ChatMessage) => !messageIds.current.has(msg.id));

            // Add all new message IDs to the set
            newMessages.forEach((msg: ChatMessage) => {
                messageIds.current.add(msg.id);
            });

            setMessages(newMessages);
            scrollToBottom();
        }
    }, [initialMessagesData, messages.length, scrollToBottom]);

    // Socket connection - for real-time updates only
    useEffect(() => {
        if (!roomId) return;

        const socketUrl = process.env.NEXT_PUBLIC_BASEURL;
        socket = io(socketUrl, {
            auth: { token: localStorage.getItem("accessToken") },
        });

        socket.emit("join-room", roomId);

        socket.on("new-message", (newMessage: ChatMessage) => {
            // CRITICAL: Only add if we haven't seen this message ID before
            if (!messageIds.current.has(newMessage.id)) {
                messageIds.current.add(newMessage.id);
                setMessages((prev) => [...prev, newMessage]);
                scrollToBottom();
            }
        });

        socket.on("message-liked", ({ messageId }: { messageId: string }) => {
            setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, hasLiked: !msg.hasLiked, likes: msg.hasLiked ? msg.likes - 1 : msg.likes + 1 } : msg)));
        });

        socket.on("message-deleted", ({ messageId }: { messageId: string }) => {
            setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
            messageIds.current.delete(messageId);
        });

        return () => {
            if (socket) {
                socket.emit("leave-room", roomId);
                socket.disconnect();
            }
        };
    }, [roomId, scrollToBottom]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || !roomId) return;

        const messageText = inputValue.trim();
        setInputValue("");

        try {
            await sendMessage({
                roomId: roomId as string,
                message: messageText,
                messageType: "text",
            }).unwrap();
            // Don't add to state here - wait for socket event
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to send message");
            setInputValue(messageText);
        }
    };

    const handleLike = async (messageId: string) => {
        try {
            await toggleLike({ messageId }).unwrap();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to like message");
        }
    };

    const handleDelete = async (messageId: string) => {
        try {
            await deleteMessage({ messageId }).unwrap();
            // Message will be removed by socket event
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete message");
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

    const getAvatarUrl = (avatarPath?: string) => {
        if (!avatarPath) return null;
        if (avatarPath.startsWith("http")) return avatarPath;
        return `${baseUrl}${avatarPath}`;
    };

    if (!roomId) {
        return (
            <div className="flex flex-col items-center justify-center h-[600px] bg-card border border-border rounded-lg">
                <MessageCircle className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-lg font-semibold">No Chat Room</p>
                <p className="text-sm text-muted-foreground">Chat is not available</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[600px] bg-card border border-border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    <h2 className="font-semibold">Live Chat</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{onlineUsers}</span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoadingMessages && messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <p className="text-sm text-muted-foreground">No messages yet</p>
                        <p className="text-xs text-muted-foreground">Be the first to say something!</p>
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isOwnMessage = msg.userId === currentUserId;
                        const avatarUrl = getAvatarUrl(msg.userProfile?.avatar);

                        return (
                            <div key={msg.id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] ${isOwnMessage ? "order-2" : "order-1"}`}>
                                    {!isOwnMessage && (
                                        <div className="flex items-center gap-2 mb-1 ml-2">
                                            {avatarUrl ? (
                                                <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200">
                                                    <Image src={avatarUrl} alt={msg.userProfile?.name || "User"} width={20} height={20} className="object-cover w-full h-full" unoptimized />
                                                </div>
                                            ) : (
                                                <div className="w-5 h-5 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] font-medium text-white">{msg.userProfile?.name?.charAt(0)?.toUpperCase() || "U"}</div>
                                            )}
                                            <p className="text-xs font-medium text-foreground">{msg.userProfile?.name || "User"}</p>
                                        </div>
                                    )}
                                    <div className={`flex items-start gap-1 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
                                        {/* Message bubble */}
                                        <div className={`rounded-2xl px-3 py-2 ${isOwnMessage ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 dark:bg-gray-800 rounded-bl-none"}`}>
                                            <p className="text-sm wrap-break-word">{msg.message}</p>
                                            <div className={`flex items-center justify-end gap-2 mt-1 text-[10px] ${isOwnMessage ? "text-blue-100" : "text-gray-500"}`}>
                                                <span>{formatTime(msg.createdAt)}</span>
                                                {msg.likes > 0 && <span>❤️ {msg.likes}</span>}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-0.5">
                                            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-transparent" onClick={() => handleLike(msg.id)}>
                                                <Heart className={`h-3 w-3 ${msg.hasLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                                            </Button>

                                            {isOwnMessage && (
                                                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-transparent" onClick={() => handleDelete(msg.id)}>
                                                    <Trash2 className="h-3 w-3 text-gray-400" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                    <Input placeholder="Type a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyPress} disabled={isSendingMessage} className="flex-1" />
                    <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim() || isSendingMessage} className="bg-blue-600 hover:bg-blue-700 text-white">
                        {isSendingMessage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MessageContainer;
