import EventHeaderAndDetails from "@/components/dashboard/my-events/go-live/EventHeaderAndDetails";
import LiveStreamWithChat from "@/components/dashboard/my-events/go-live/LiveStreamWithChat";

export const metadata = {
    title: "Tech Conference 2025",
    description: "Join us for an innovative tech conference with live streaming and interactive chat",
};

export default function Page() {
    return (
        <main>
            <EventHeaderAndDetails />
            <LiveStreamWithChat />
        </main>
    );
}
