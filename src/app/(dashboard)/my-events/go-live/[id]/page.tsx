import Broadcast from "@/components/dashboard/my-events/go-live/BrodCast";
import EventHeaderAndDetails from "@/components/dashboard/my-events/go-live/EventHeaderAndDetails";

export const metadata = {
    title: "Tech Conference 2025",
    description: "Join us for an innovative tech conference with live streaming and interactive chat",
};

export default function Page() {
    return (
        <main>
            <EventHeaderAndDetails />
            {/* <LiveStreamWithChat /> */}
            <Broadcast />
        </main>
    );
}
