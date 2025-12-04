"use client";

import { useState } from "react";
import ChatSection from "./ChatSection";
import LiveStreamSection from "./LiveScteamSection";

export default function EventStream() {
    const [messages, setMessages] = useState<Array<{ id: string; text: string }>>([]);
    const [isStreamActive, setIsStreamActive] = useState(false);

    const handleSendMessage = (text: string) => {
        if (text.trim()) {
            setMessages([...messages, { id: Date.now().toString(), text }]);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <LiveStreamSection isActive={isStreamActive} onStartStream={() => setIsStreamActive(true)} />
            </div>
            <div className="lg:col-span-1">
                <ChatSection messages={messages} onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
}
