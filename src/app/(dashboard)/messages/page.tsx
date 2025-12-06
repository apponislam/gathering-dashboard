"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Search, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Message {
    id: string;
    name: string;
    initials: string;
    preview: string;
    timestamp: string;
    unread: boolean;
}

interface ChatMessage {
    id: string;
    sender: "user" | "attendee";
    text: string;
    timestamp: string;
}

const initialMessages: Message[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        initials: "SJ",
        preview: "Thank you! Looking forward to the event.",
        timestamp: "2 min ago",
        unread: true,
    },
    {
        id: "2",
        name: "Mike Chen",
        initials: "MC",
        preview: "Got it, thanks for the update!",
        timestamp: "30 min ago",
        unread: false,
    },
    {
        id: "3",
        name: "Emily Davis",
        initials: "ED",
        preview: "Is there parking available at the venue?",
        timestamp: "1 hour ago",
        unread: true,
    },
    {
        id: "4",
        name: "James Wilson",
        initials: "JW",
        preview: "See you there! Can't wait.",
        timestamp: "2 hours ago",
        unread: false,
    },
    {
        id: "5",
        name: "Alex Turner",
        initials: "AT",
        preview: "Do you have any vegan options?",
        timestamp: "5 hours ago",
        unread: false,
    },
];

const chatHistory: Record<string, ChatMessage[]> = {
    "1": [
        { id: "1", sender: "attendee", text: "Hi! I'm excited about the tech conference.", timestamp: "10:30 AM" },
        { id: "2", sender: "user", text: "Welcome Sarah! We're excited to have you.", timestamp: "10:32 AM" },
        { id: "3", sender: "attendee", text: "Thank you! Looking forward to the event.", timestamp: "10:35 AM" },
    ],
    "2": [
        { id: "1", sender: "attendee", text: "Got the ticket confirmation, thanks!", timestamp: "Yesterday" },
        { id: "2", sender: "user", text: "Great! Let us know if you need anything.", timestamp: "Yesterday" },
    ],
    "3": [{ id: "1", sender: "attendee", text: "Hi, is there parking available at the venue?", timestamp: "1 hour ago" }],
    "4": [
        { id: "1", sender: "attendee", text: "See you there! Can't wait.", timestamp: "2 hours ago" },
        { id: "2", sender: "user", text: "Looking forward to meeting you!", timestamp: "2 hours ago" },
    ],
    "5": [
        { id: "1", sender: "attendee", text: "Do you have any vegan options for lunch?", timestamp: "5 hours ago" },
        { id: "2", sender: "user", text: "Yes! We have several vegan options available.", timestamp: "4 hours ago" },
    ],
};

export default function MessagesPage() {
    const [selectedMessage, setSelectedMessage] = useState<string>("1");
    const [searchQuery, setSearchQuery] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [filter, setFilter] = useState<string>("all");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Use useMemo to fix the dependency warning
    const selectedAttendee = useMemo(() => messages.find((m) => m.id === selectedMessage), [messages, selectedMessage]);

    // Use useMemo to fix the dependency warning
    const currentChat = useMemo(() => chatHistory[selectedMessage] || [], [selectedMessage]);

    const unreadCount = messages.filter((m) => m.unread).length;

    const handleSendMessage = () => {
        if (!messageInput.trim() || !selectedMessage) return;

        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            sender: "user",
            text: messageInput,
            timestamp: "Just now",
        };

        chatHistory[selectedMessage] = [...(chatHistory[selectedMessage] || []), newMessage];

        // Use functional update to avoid dependency on messages
        setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === selectedMessage ? { ...msg, preview: messageInput, timestamp: "Just now", unread: false } : msg)));

        setMessageInput("");
    };

    const handleSelectMessage = (id: string) => {
        setSelectedMessage(id);
        // Mark as read when selecting a message
        setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === id ? { ...msg, unread: false } : msg)));
    };

    const filteredMessages = useMemo(
        () =>
            messages
                .filter((message) => {
                    if (filter === "unread") return message.unread;
                    if (filter === "read") return !message.unread;
                    return true;
                })
                .filter((message) => message.name.toLowerCase().includes(searchQuery.toLowerCase()) || message.preview.toLowerCase().includes(searchQuery.toLowerCase())),
        [messages, filter, searchQuery]
    );

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentChat]);

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-background">
            {/* Left Panel - Messages List */}
            <div className="w-full lg:w-80 border-r border-border bg-card flex flex-col h-1/2 lg:h-full">
                {/* Header */}
                <div className="border-b border-border p-4">
                    <h1 className="text-xl font-bold text-foreground">Messages</h1>
                    <p className="text-sm text-muted-foreground mt-1">Contact attendees</p>
                    <Badge className="mt-2" variant="secondary">
                        {unreadCount} unread
                    </Badge>
                </div>

                {/* Search and Filter */}
                <div className="p-3 border-b border-border space-y-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 bg-muted" />
                    </div>

                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-full bg-muted">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Messages</SelectItem>
                            <SelectItem value="unread">Unread</SelectItem>
                            <SelectItem value="read">Read</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredMessages.length === 0 ? (
                        <div className="p-6 text-center">
                            <MessageCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                            <p className="text-muted-foreground">No messages found</p>
                        </div>
                    ) : (
                        filteredMessages.map((message) => (
                            <div key={message.id} onClick={() => handleSelectMessage(message.id)} className={`p-3 border-b border-border cursor-pointer hover:bg-muted/50 ${selectedMessage === message.id ? "bg-muted" : ""}`}>
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-muted text-foreground">{message.initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-medium text-foreground truncate">{message.name}</h3>
                                            <div className="flex items-center gap-2">
                                                {message.unread && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                                                <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground truncate">{message.preview}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right Panel - Chat */}
            <div className="flex-1 flex flex-col bg-background">
                {selectedAttendee ? (
                    <>
                        <div className="border-b border-border p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-muted text-foreground">{selectedAttendee.initials}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2 className="font-semibold text-foreground">{selectedAttendee.name}</h2>
                                        <p className="text-xs text-muted-foreground">Last message: {selectedAttendee.timestamp}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {currentChat.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] rounded-lg px-3 py-2 ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                                        <p className="text-sm">{msg.text}</p>
                                        <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="border-t border-border p-4">
                            <div className="flex items-center gap-2">
                                <Input placeholder="Type a message..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyDown={handleKeyPress} className="flex-1 bg-muted" />
                                <Button onClick={handleSendMessage} size="sm" className="gap-2 bg-foreground text-background hover:opacity-90" disabled={!messageInput.trim()}>
                                    <Send className="w-4 h-4" />
                                    Send
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-6">
                        <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center mb-4">
                            <MessageCircle className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-lg font-semibold text-foreground mb-2">Select a conversation</h2>
                        <p className="text-sm text-muted-foreground text-center">Choose from the list to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}
