"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Users } from "lucide-react";

interface ChatSectionProps {
    messages: Array<{ id: string; text: string }>;
    onSendMessage: (text: string) => void;
}

export default function ChatSection({ messages, onSendMessage }: ChatSectionProps) {
    const [inputValue, setInputValue] = useState("");

    const handleSend = () => {
        onSendMessage(inputValue);
        setInputValue("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
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

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
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

            <div className="p-4 border-t border-border space-y-2">
                <Input placeholder="Type a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} className="bg-background" />
                <Button onClick={handleSend} size="sm" className="w-full gap-2 bg-foreground text-background hover:opacity-90">
                    <Send className="w-4 h-4" />
                    Send
                </Button>
            </div>
        </div>
    );
}
