import EventDetails from "@/components/dashboard/my-events/go-live/EventDetails";
import EventHeader from "@/components/dashboard/my-events/go-live/EventHeader";
import EventStream from "@/components/dashboard/my-events/go-live/EventStream";

export const metadata = {
    title: "Tech Conference 2025",
    description: "Join us for an innovative tech conference with live streaming and interactive chat",
};

export default function Page() {
    return (
        <main className="min-h-screen bg-background">
            <EventHeader />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <EventDetails />
                <EventStream />
            </div>
        </main>
    );
}
