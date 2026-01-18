import EventHeaderAndDetails from "@/components/dashboard/my-events/go-live/EventHeaderAndDetails";
import LiveStreamWithChat from "@/components/dashboard/my-events/go-live/LiveStreamWithChat";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
    title: "Tech Conference 2025",
    description: "Join us for an innovative tech conference with live streaming and interactive chat",
};

export default function Page() {
    return (
        <main>
            <div className="border-b border-border pb-8">
                <EventHeaderAndDetails />
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">Title</label>
                        <Input defaultValue="Tech Conference 2025 - Innovation & Development" className="bg-muted rounded-lg p-4 min-h-12 text-foreground" />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">Description</label>
                        <Textarea defaultValue="Join industry leaders and innovators for a full day of cutting-edge talks, workshops, and networking. Discover the latest trends in web development, AI, and cloud technologies." className="bg-muted rounded-lg p-4 min-h-32 text-foreground resize-none" rows={5} />
                    </div>
                </div>
            </div>

            <div className="mx-auto px-4 py-8">
                <LiveStreamWithChat />
            </div>
        </main>
    );
}
